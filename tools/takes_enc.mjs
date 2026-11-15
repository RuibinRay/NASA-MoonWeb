// Turns the chosen take of each clip into the site's files: node takes_enc.mjs <takes dir> <site video dir> id=variant …
//   <id>.mp4    1080p, a keyframe every four frames so it can be stepped backwards and forwards by scrolling
//   <id>_s.mp4  720p, the same, for phones
//   <id>.jpg    its first frame (so the picture shown before the film loads is exactly where the film starts)
// It also writes joins_<id>.jpg into the takes folder: the last frame of each clip beside the first frame of the next.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
const [dir, out, ...picks] = process.argv.slice(2);
const ff = (args) => { const r = spawnSync('ffmpeg', ['-v', 'error', '-y', ...args], { encoding: 'utf8' }); if (r.status !== 0) console.error('ffmpeg failed', args.slice(-1)[0], r.stderr.slice(0, 300)); return r.status === 0; };
for (const p of picks) { const [id, v] = p.split('='), src = `${dir}/${id}_${v}.mp4`; if (!fs.existsSync(src)) { console.error('missing', src); continue; }
  const x = ['-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-g', '4', '-bf', '0', '-movflags', '+faststart', '-an'];
  ff(['-i', src, '-vf', 'scale=1920:1080:flags=lanczos,fps=24', ...x, '-crf', '23', `${out}/${id}.mp4`]);
  ff(['-i', src, '-vf', 'scale=1280:720:flags=lanczos,fps=24', ...x, '-crf', '25', `${out}/${id}_s.mp4`]);
  ff(['-i', `${out}/${id}.mp4`, '-frames:v', '1', '-q:v', '3', `${out}/${id}.jpg`]);
  ff(['-i', src, '-frames:v', '1', '-vf', 'scale=960:540', '-q:v', '3', `${dir}/first_${id}.jpg`]);
  ff(['-sseof', '-0.2', '-i', src, '-update', '1', '-vf', 'scale=960:540', '-q:v', '3', `${dir}/last_${id}.jpg`]);
  const kb = (f) => Math.round(fs.statSync(f).size / 1024); console.log(id, v, kb(`${out}/${id}.mp4`) + ' kB', kb(`${out}/${id}_s.mp4`) + ' kB (phone)'); }
