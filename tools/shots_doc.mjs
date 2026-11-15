// Writes docs/HIGGSFIELD_SHOTS.md from the three shot files, so the shot list and the prompts can never drift apart.
//   node tools/shots_doc.mjs
//   tools/shots.json       the spacecraft stills (keyframes) and the two looping clips
//   tools/shots_rego.json  REGO's stills (keyframes)
//   tools/takes.json       the opening's four new keyframes, and the twelve clips that join the keyframes together
import fs from 'node:fs';
const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const ships = read('tools/shots.json'), rego = read('tools/shots_rego.json'), takes = read('tools/takes.json');
const B = String.fromCharCode(96), code = (s) => B + s + B;
const stills = {}; for (const j of ships.jobs) if (j.still) stills[j.id] = j; for (const j of rego.jobs) stills[j.id] = j; for (const s of takes.stills) stills[s.id] = { still: s.prompt, refs: s.refs, k4: true };
const where = { open1: 'Opening 1 of 5: out of the dark, up to the engines', open2: 'Opening 2 of 5: past the engines and along the hull', open3: 'Opening 3 of 5: forward to the cockpit window', open4: 'Opening 4 of 5: through the glass into the cockpit', open5: 'Opening 5 of 5: REGO waves',
  moon1: 'Moon 1 of 2: down from the fly-over to the broken solar panel', moon2: 'Moon 2 of 2: REGO and the panel', mars1: 'Mars 1 of 3: from deep space down to the landing', mars2: 'Mars 2 of 3: touchdown, and round to the ramp', mars3: 'Mars 3 of 3: REGO rolls onto Mars',
  final1: 'Ending 1 of 2: pull back through the observation window', final2: 'Ending 2 of 2: REGO waves goodbye' };
const used = new Set(takes.clips.flatMap((c) => [c.from, c.to]).filter(Boolean));
const V = takes.variants, pick = (id) => takes.picked[id], model = (v) => (v === 'k4' ? 'Seedance 2.0, 4K' : 'Seedance 2.5, 1080p');
const refText = (r) => (r.startsWith('http') ? r : code(r));
let md = `# Higgsfield shot list

Every cinematic still and clip on the site was made with Higgsfield from the prompts below, through its API. The site shows each one with a visible "SI-generated" mark.

## How the films are made to join

Each film stage on the site is one continuous shot built from several five-second clips. To make the clips join without a cut:

1. **Keyframes.** A row of stills is made first with the Higgsfield image model (${code('marketing-studio/image/sunburst')}, 16:9). The opening's four new keyframes are 4K; the others are 2K. ${code('ship_ref')} was made first and given to every other spacecraft still as a reference, and every REGO still was given the game's own picture of REGO, so the ship and the robot are the same in every shot.
2. **Clips between keyframes.** Each clip is made with image-to-video and is given **both its first frame and its last frame**: the last frame of one clip is the first frame of the next. The last clip of each stage has only a first frame.
3. **Two takes of every clip** were made: one with ${code(V.k4.endpoint)} at 4K, one with ${code(V.hd.endpoint)} at 1080p. The 4K take is used for eleven clips. ${code('final2')} uses the 1080p take, because in its 4K take REGO's dark visor turned white.
4. **For the site** each chosen take is encoded to 1080p (and 720p for phones) with a keyframe every four frames, so scrolling can step it backwards and forwards. The 4K originals are not in the repository: a 4K film that follows the scroll would be several hundred megabytes and would stutter.

Shared direction for the joined clips: ${takes.videoStyle}

## The clips

| Clip | Where it is used | From keyframe | To keyframe | Take used | Files |
|---|---|---|---|---|---|
${takes.clips.map((c) => `| ${code(c.id)} | ${where[c.id]} | ${code(c.from)} | ${c.to ? code(c.to) : 'none'} | ${model(pick(c.id))} | ${code('assets/video/' + c.id + '.mp4')}, ${code(c.id + '_s.mp4')}, ${code(c.id + '.jpg')} |`).join('\n')}

Two more clips loop on their own and are not part of a joined shot: ${code('earth_arrival')} (Earth arrival) and ${code('moon_impact')} (Moon, scene A), both Seedance 2.5 at 720p.

## Clip prompts
`;
for (const c of takes.clips) md += `\n### ${c.id}\n\n${c.prompt}\n`;
md += `\n### earth_arrival (loop)\n\n${ships.jobs.find((j) => j.id === 'earth_arrival').video}\n\n### moon_impact (loop)\n\n**Starts from:** ${ships.jobs.find((j) => j.id === 'moon_impact').image_url}\n\n${ships.jobs.find((j) => j.id === 'moon_impact').video}\n`;
md += `\n## Keyframe prompts\n\nShared style for spacecraft stills: ${takes.stillStyle}\n\nShared style for REGO's stills: ${rego.style}\n`;
for (const id of ['ship_ref', ...[...used].filter((x) => x !== 'ship_ref'), 'earth_arrival']) { const s = stills[id]; if (!s) continue; md += `\n### ${id}${s.k4 ? ' (4K)' : ''}\n\n${s.still}\n`; if (s.refs && s.refs.length) md += `\n**Reference pictures:** ${s.refs.map(refText).join(', ')}\n`; }
md += `
## Making them again

${B}${B}${B}bash
HF_KEY="<key id>:<key secret>" node tools/hf_batch.mjs tools/shots.json art
HF_KEY="<key id>:<key secret>" node tools/hf_batch.mjs tools/shots_rego.json art
HF_KEY="<key id>:<key secret>" node tools/hf_chain.mjs tools/takes.json art/takes
node tools/takes_enc.mjs art/takes assets/video ${takes.clips.map((c) => c.id + '=' + pick(c.id)).join(' ')}
${B}${B}${B}

The key is read from the environment and is never written to a file. ${code('art/')} holds the full-size originals and is not committed. ${code('tools/takes_enc.mjs')} needs FFmpeg.
`;
fs.writeFileSync('docs/HIGGSFIELD_SHOTS.md', md); console.log('wrote docs/HIGGSFIELD_SHOTS.md', md.length, 'characters');
