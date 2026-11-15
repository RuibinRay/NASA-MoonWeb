// Draws a map of Mars for the showcase site from NASA's MOLA elevation data (the copy packed in the game's js/mars/mola.js).
// Heights are real (one value per degree); the colours are an illustration: rust tones, darker where the ground is low,
// lit as if from the north-west, with the two polar caps in white.
//   node mars_tex.mjs <game repo> <out.ppm>
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const [repo, out] = process.argv.slice(2), { GLOBAL } = await import(pathToFileURL(repo + '/js/mars/mola.js').href);
const W = 2048, H = 1024, g = GLOBAL, at = (i, j) => g.min + g.step * g.data[Math.max(0, Math.min(g.h - 1, j)) * g.w + ((i % g.w) + g.w) % g.w];
const elev = (x, y) => { const fx = (x / W) * g.w - 0.5, fy = (y / H) * g.h - 0.5, i = Math.floor(fx), j = Math.floor(fy), u = fx - i, v = fy - j; return (at(i, j) * (1 - u) + at(i + 1, j) * u) * (1 - v) + (at(i, j + 1) * (1 - u) + at(i + 1, j + 1) * u) * v; };
let a = 12345; const rnd = () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; };
const noise = new Float32Array(256 * 256).map(() => rnd()), nz = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), u = x - xi, v = y - yi, n = (i, j) => noise[((j & 255) << 8) | (i & 255)]; return (n(xi, yi) * (1 - u) + n(xi + 1, yi) * u) * (1 - v) + (n(xi, yi + 1) * (1 - u) + n(xi + 1, yi + 1) * u) * v; };
const buf = Buffer.alloc(W * H * 3), clamp = (x) => Math.max(0, Math.min(255, x));
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const h = elev(x, y), k = Math.max(0, Math.min(1, (h + 6000) / 14000)), sh = Math.max(0.55, Math.min(1.35, 1 + (elev(x - 2, y - 2) - elev(x + 2, y + 2)) * 0.00022));
  const tex = 0.86 + 0.28 * (0.5 * nz(x / 9, y / 9) + 0.3 * nz(x / 3.1, y / 3.1) + 0.2 * nz(x / 41, y / 41));
  let r = 118 + 104 * k, gr = 60 + 78 * k, b = 40 + 52 * k; const lat = 90 - (y / H) * 180, cap = lat > 0 ? (lat - 78) / 6 : (-lat - 82) / 5, c = Math.max(0, Math.min(1, cap + (nz(x / 14, y / 14) - 0.5) * 0.5));
  r = r * sh * tex; gr = gr * sh * tex; b = b * sh * tex; r += (238 - r) * c; gr += (236 - gr) * c; b += (232 - b) * c;
  const o = (y * W + x) * 3; buf[o] = clamp(r); buf[o + 1] = clamp(gr); buf[o + 2] = clamp(b);
}
fs.writeFileSync(out, Buffer.concat([Buffer.from(`P6\n${W} ${H}\n255\n`), buf])); console.log('wrote', out);
