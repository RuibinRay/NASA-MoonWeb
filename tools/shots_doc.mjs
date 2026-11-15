// Writes docs/HIGGSFIELD_SHOTS.md from tools/shots.json and tools/shots_rego.json, so the shot list and the prompts can never drift apart.
//   node tools/shots_doc.mjs
import fs from 'node:fs';
const spec = JSON.parse(fs.readFileSync('tools/shots.json', 'utf8'));
const rego = JSON.parse(fs.readFileSync('tools/shots_rego.json', 'utf8'));
const where = { ship_far: 'Opening, first quarter of the scroll', ship_ref: 'Opening, second quarter; also the page poster', ship_journey: 'Opening, third quarter', earth_arrival: 'Earth arrival (loops)', moon_flyover: 'Moon arrival, first half of the scroll',
  moon_impact: 'Moon, scene A (loops)', mars_travel: 'Mars arrival, first third of the scroll', mars_landing: 'Mars arrival, middle third', final_wide: 'The ending, first half of the scroll',
  rego_cockpit: 'Opening, last quarter: REGO welcomes you aboard', rego_moon: 'Moon arrival, second half: REGO finds the broken solar panel', rego_mars: 'Mars arrival, last third: REGO rolls onto Mars', rego_farewell: 'The ending, second half: REGO waves goodbye' };
const jobs = spec.jobs.concat(rego.jobs);
let md = `# Higgsfield shot list

Every cinematic still and clip on the site was made with Higgsfield from the prompts below, through its API. The site shows each one with a visible "SI-generated" mark.

- **Stills:** Higgsfield image model (\`marketing-studio/image/sunburst\`), 16:9, 2K.
- **Clips:** Seedance 2.5 image-to-video (\`bytedance/seedance-2.5/image-to-video\`), 5 seconds, 720p, no sound, each started from its still.
- **One spacecraft:** \`ship_ref\` was made first, and every other spacecraft still was given it as a reference picture, so the ship is the same in every shot.
- **One REGO:** the four \`rego_\` shots were each given the game's own picture of REGO (\`assets/img/c_rego.jpg\` in the game) as their first reference, so the robot in the films is the robot in the game. Two of them were also given a game picture of the place (the Moon base, the Mars outpost).
- **Two shots start from pictures the game already has:** \`moon_impact\` starts from the game's meteoroid event card, and \`mars_landing\` uses the game's Mars outpost picture as a second reference.

Shared style for stills: ${spec.style}

Shared direction for clips: ${spec.videoStyle}

Shared style for REGO's stills: ${rego.style}

Shared direction for REGO's clips: ${rego.videoStyle}

| Shot | Where it is used | Files |
|---|---|---|
${jobs.map((j) => `| \`${j.id}\` | ${where[j.id] || ''} | \`assets/video/${j.id}.mp4\`, \`assets/video/${j.id}.jpg\` |`).join('\n')}

## Prompts
`;
for (const j of jobs) {
  md += `\n### ${j.id}\n\n`;
  if (j.still) md += `**Still.** ${j.still}\n\n`;
  if (j.image_url) md += `**Starts from:** ${j.image_url}\n\n`;
  if (j.refs) md += `**Reference pictures:** ${j.refs.map((r) => (r.startsWith('http') ? r : '`' + r + '`')).join(', ')}\n\n`;
  md += `**Clip (${j.seconds || 5} s).** ${j.video}\n`;
}
md += `
## Making them again

\`\`\`bash
HF_KEY="<key id>:<key secret>" node tools/hf_batch.mjs tools/shots.json art
HF_KEY="<key id>:<key secret>" node tools/hf_batch.mjs tools/shots_rego.json art
bash tools/encode.sh
\`\`\`

The key is read from the environment and is never written to a file. \`art/\` holds the full-size originals and is not committed. \`tools/encode.sh\` needs FFmpeg: it makes the 720p web files, and gives the clips that follow the scroll a keyframe every four frames so they can be stepped backwards and forwards.
`;
fs.writeFileSync('docs/HIGGSFIELD_SHOTS.md', md); console.log('wrote docs/HIGGSFIELD_SHOTS.md', md.length, 'characters');
