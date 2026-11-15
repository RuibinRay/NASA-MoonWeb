// Serves a folder like a real static host does, including parts of a file (so a video can be seeked), and saves
// frames POSTed by the page:   node webserve.mjs <root> <outDir> <port>
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(process.argv[2]), OUT = path.resolve(process.argv[3]), PORT = Number(process.argv[4] || 8153);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.md': 'text/plain; charset=utf-8' };
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]), m = /^\/__frame\/([a-z0-9_-]+)\/(\d+)$/i.exec(url);
  if (req.method === 'POST' && m) { const chunks = []; req.on('data', (c) => chunks.push(c)); req.on('end', () => { const dir = path.join(OUT, m[1]); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, m[2].padStart(5, '0') + '.jpg'), Buffer.concat(chunks)); res.writeHead(200); res.end('ok'); }); return; }
  let p = url; if (p.endsWith('/')) p += 'index.html';
  const file = path.join(ROOT, path.normalize(p)); if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const head = { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'Accept-Ranges': 'bytes' }, r = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (r) { const start = r[1] ? +r[1] : Math.max(0, st.size - +r[2]), end = r[1] && r[2] ? Math.min(+r[2], st.size - 1) : st.size - 1; res.writeHead(206, { ...head, 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Content-Length': end - start + 1 }); return fs.createReadStream(file, { start, end }).pipe(res); }
    res.writeHead(200, { ...head, 'Content-Length': st.size }); fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => console.log('static server on ' + PORT));
