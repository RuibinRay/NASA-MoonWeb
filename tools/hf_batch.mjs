// Runs a list of Higgsfield jobs (a still, and optionally a video made from it) and downloads the results.
//   HF_KEY="<id>:<secret>" node hf_batch.mjs shots.json <out dir>
// The key is read from the environment only. State (request ids, result links) is kept in <out dir>/manifest.json,
// so a run that is stopped can be started again without paying twice.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const [specFile, outDir] = process.argv.slice(2);
const KEY = (process.env.HF_KEY || '').trim(); if (!KEY) { console.error('Set HF_KEY'); process.exit(1); }
const H = { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' }, API = 'https://api.higgsfield.ai/';
const spec = JSON.parse(fs.readFileSync(specFile, 'utf8')); fs.mkdirSync(outDir, { recursive: true });
const stateFile = path.join(outDir, 'manifest.json'), state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : {};
const save = () => fs.writeFileSync(stateFile, JSON.stringify(state, null, 1)), sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run(endpoint, body, st, file, pick) {
  if (st.file && fs.existsSync(path.join(outDir, st.file))) return true;
  if (!st.status_url) {
    const r = await fetch(API + endpoint, { method: 'POST', headers: { ...H, 'Idempotency-Key': crypto.randomUUID() }, body: JSON.stringify(body) }), t = await r.text();
    if (!r.ok) { st.error = `${r.status} ${t.slice(0, 300)}`; save(); console.error('SUBMIT FAILED', file, st.error); return false; }
    const j = JSON.parse(t); Object.assign(st, { request_id: j.request_id, status_url: j.status_url, endpoint, body, error: undefined }); save(); console.log('submitted', file);
  }
  const t0 = Date.now();
  while (Date.now() - t0 < 25 * 60 * 1000) {
    await sleep(7000); let s; try { s = await (await fetch(st.status_url, { headers: H })).json(); } catch (e) { continue; }
    if (s.status === 'completed') { const url = pick(s); if (!url) { st.error = 'no url ' + JSON.stringify(s).slice(0, 200); save(); return false; }
      const ext = (url.split('?')[0].match(/\.(png|jpe?g|webp|mp4|mov)$/i)?.[1] || (file.endsWith('v') ? 'mp4' : 'png')).toLowerCase(), name = `${file}.${ext}`;
      fs.writeFileSync(path.join(outDir, name), Buffer.from(await (await fetch(url)).arrayBuffer())); Object.assign(st, { url, file: name, seconds: Math.round((Date.now() - t0) / 1000) }); save(); console.log('DONE', name, st.seconds + 's'); return true; }
    if (['failed', 'nsfw', 'canceled'].includes(s.status)) { st.error = s.status + ' ' + JSON.stringify(s.error || '').slice(0, 200); st.status_url = undefined; save(); console.error('FAILED', file, st.error); return false; }
  }
  console.error('TIMEOUT', file); return false;
}
async function job(j) {
  const st = (state[j.id] ||= { still: {}, video: {} }); let imageUrl = j.image_url || null;
  if (j.still) {
    const refs = (j.refs || []).map((r) => (r.startsWith('http') ? r : state[r]?.still?.url)).filter(Boolean), body = { prompt: `${j.still} ${spec.style || ''}`.trim(), resolution: spec.resolution || '2k', quality: 'high', aspect_ratio: '16:9' };
    if (refs.length) body.image_urls = refs;
    if (!(await run('marketing-studio/image/sunburst', body, st.still, j.id, (s) => s.images?.[0]?.url))) return; imageUrl = st.still.url;
  }
  if (j.video && imageUrl) await run('bytedance/seedance-2.5/image-to-video', { image_url: imageUrl, prompt: `${j.video} ${spec.videoStyle || ''}`.trim(), duration: j.seconds || 5, resolution: spec.videoResolution || '720p', generate_audio: false }, st.video, j.id + '_v', (s) => s.video?.url || s.videos?.[0]?.url);
}
// jobs that others use as a reference go first; the rest run a few at a time
const used = new Set(spec.jobs.flatMap((j) => (j.refs || []).filter((r) => !r.startsWith('http'))));
for (const j of spec.jobs.filter((x) => used.has(x.id))) await job(j);
const rest = spec.jobs.filter((x) => !used.has(x.id)); let next = 0;
await Promise.all(Array.from({ length: Number(process.env.HF_CONC || 5) }, async () => { while (next < rest.length) { const j = rest[next++]; try { await job(j); } catch (e) { console.error('ERROR', j.id, e.message); } } }));
console.log('finished:', spec.jobs.map((j) => `${j.id}:${state[j.id]?.still?.file || '-'}/${state[j.id]?.video?.file || '-'}`).join(' '));
