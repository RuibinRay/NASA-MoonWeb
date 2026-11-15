// Changes the version tag on every stylesheet and script address, so browsers fetch the new files together.
//   node tools/stamp.mjs <tag>      e.g. node tools/stamp.mjs b7
import fs from 'node:fs';
const tag = process.argv[2]; if (!tag) { console.error('give a tag'); process.exit(1); }
for (const f of ['index.html', 'js/main.js']) { const s = fs.readFileSync(f, 'utf8'), t = s.replace(/\?v=[\w.-]+/g, '?v=' + tag); fs.writeFileSync(f, t); console.log(f, (s.match(/\?v=[\w.-]+/g) || []).length, 'addresses stamped'); }
