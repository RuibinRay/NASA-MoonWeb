// Makes films that join without a cut: a row of keyframe stills, then one clip from each keyframe to the next
// (the clip is given both its first and its last frame), so the end of one clip is the start of the following one.
//   HF_KEY="<id>:<secret>" [HF_CONC=8] [HF_ONLY=variant] node hf_chain.mjs <spec.json> <out dir>
// The key is read from the environment only. State is kept in <out dir>/manifest.json, so a stopped run can be
// started again without paying twice.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const [specFile, outDir] = process.argv.slice(2);
const KEY = (process.env.HF_KEY || '').trim(); if (!KEY) { console.error('Set HF_KEY'); process.exit(1); }
const H = { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' }, API = 'https://api.higgsfield.ai/';
const spec = JSON.parse(fs.readFileSync(specFile, 'utf8')); fs.mkdirSync(outDir, { recursive: true });
const base = spec.base && fs.existsSync(spec.base) ? JSON.parse(fs.readFileSync(spec.base, 'utf8')) : {};
const stateFile = path.join(outDir, 'manifest.json'), state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : {};
state.stills ||= {}; state.clips ||= {};
const save = () => fs.writeFileSync(stateFile, JSON.stringify(state, null, 1)), sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// a picture named by a still made here, a still made earlier, or a web address
const pic = (x) => (!x ? null : x.startsWith('http') ? x : state.stills[x]?.url || base[x]?.still?.url || null);

async function run(endpoint, body, st, file, pick) {
  if (st.file && fs.existsSync(path.join(outDir, st.file))) return true;
  if (!st.status_url) {
    for (let tries = 0; ; tries++) {
      const r = await fetch(API + endpoint, { method: 'POST', headers: { ...H, 'Idempotency-Key': crypto.randomUUID() }, body: JSON.stringify(body) }), t = await r.text();
      if (r.ok) { const j = JSON.parse(t); Object.assign(st, { request_id: j.request_id, status_url: j.status_url, endpoint, body, error: undefined }); save(); console.log('submitted', file); break; }
      if ((r.status === 429 || r.status >= 500) && tries < 6) { console.log('busy, waiting', file, r.status); await sleep(20000 + tries * 10000); continue; }
      st.error = `${r.status} ${t.slice(0, 300)}`; save(); console.error('SUBMIT FAILED', file, st.error); return false;
    }
  }
  const t0 = Date.now();
  while (Date.now() - t0 < 40 * 60 * 1000) {
    await sleep(8000); let s; try { s = await (await fetch(st.status_url, { headers: H })).json(); } catch (e) { continue; }
    if (s.status === 'completed') { const url = pick(s); if (!url) { st.error = 'no url ' + JSON.stringify(s).slice(0, 200); save(); return false; }
      const ext = (url.split('?')[0].match(/\.(png|jpe?g|webp|mp4|mov)$/i)?.[1] || (file.includes('@') ? 'mp4' : 'png')).toLowerCase(), name = `${file.replace('@', '_')}.${ext}`;
      fs.writeFileSync(path.join(outDir, name), Buffer.from(await (await fetch(url)).arrayBuffer())); Object.assign(st, { url, file: name, seconds: Math.round((Date.now() - t0) / 1000) }); save(); console.log('DONE', name, st.seconds + 's'); return true; }
    if (['failed', 'nsfw', 'canceled'].includes(s.status)) { st.error = s.status + ' ' + JSON.stringify(s.error || s).slice(0, 240); st.status_url = undefined; save(); console.error('FAILED', file, st.error); return false; }
  }
  console.error('TIMEOUT', file); return false;
}
const pool = async (items, n, fn) => { let next = 0; await Promise.all(Array.from({ length: n }, async () => { while (next < items.length) { const it = items[next++]; try { await fn(it); } catch (e) { console.error('ERROR', it.id, e.message); } } })); };
const CONC = Number(process.env.HF_CONC || 8);

// 1. the keyframes
await pool(spec.stills || [], CONC, async (s) => { const st = (state.stills[s.id] ||= {}); const refs = (s.refs || []).map(pic).filter(Boolean);
  const body = { prompt: `${s.prompt} ${s.style || spec.stillStyle || ''}`.trim(), resolution: spec.stillResolution || '4k', quality: 'high', aspect_ratio: '16:9' }; if (refs.length) body.image_urls = refs;
  await run('marketing-studio/image/sunburst', body, st, s.id, (r) => r.images?.[0]?.url); });

// 2. the clips, each in every variant asked for (a variant is a model and a resolution)
const jobs = []; for (const c of spec.clips || []) for (const v of c.variants || Object.keys(spec.variants)) if (!process.env.HF_ONLY || process.env.HF_ONLY === v) jobs.push({ ...c, v, id: `${c.id}@${v}` });
await pool(jobs, CONC, async (c) => { const st = (state.clips[c.id] ||= {}), V = spec.variants[c.v], from = pic(c.from), to = pic(c.to);
  if (!from || (c.to && !to)) { console.error('MISSING FRAME', c.id, c.from, c.to); return; }
  const body = { image_url: from, prompt: `${c.prompt} ${spec.videoStyle || ''}`.trim(), duration: c.seconds || 5, resolution: V.resolution, generate_audio: false }; if (to) body.end_image_url = to;
  await run(V.endpoint, body, st, c.id, (r) => r.video?.url || r.videos?.[0]?.url); });
console.log('finished. stills:', Object.keys(state.stills).map((k) => `${k}:${state.stills[k].file || state.stills[k].error || '-'}`).join(' '));
console.log('clips:', Object.keys(state.clips).map((k) => `${k}:${state.clips[k].file || state.clips[k].error || '-'}`).join(' '));
