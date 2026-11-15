// MOONKEEPER: Beyond Earth — REGO, the robot from the game, as your guide on this site.
// The model below is the game's own REGO (js/actors.js in the game's repository): white rounded body, one orange band,
// two treads, a wide head with a dark visor and two cyan eyes, an antenna with an amber tip, a chest lamp, two short arms.
// Here he lives in a small corner of the screen, rolls his treads as you scroll, looks where you point, and says a
// different thing in every part of the journey. He can be told to be quiet or tucked away.
import * as THREE from '../lib/three.module.min.js';

const std = (o) => new THREE.MeshStandardMaterial(o);
const mesh = (g, m, x = 0, y = 0, z = 0) => { const k = new THREE.Mesh(g, m); k.position.set(x, y, z); return k; };
function eyeCanvas(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d')); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }

class Rego {
  constructor() {
    const g = this.group = new THREE.Group();
    const white = std({ color: 0xeeeee8, roughness: 0.55 }), orange = std({ color: 0xff7a1a, roughness: 0.55 }), dark = std({ color: 0x24262a, roughness: 0.7, metalness: 0.3 });
    this.wheels = [];
    for (const s of [-1, 1]) { const tr = mesh(new THREE.CapsuleGeometry(0.17, 0.44, 5, 12), dark, 0.33 * s, 0.17, 0); tr.rotation.x = Math.PI / 2; tr.scale.x = 0.75; g.add(tr);
      for (const z of [-0.2, 0.2]) { const w = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.28, 10), std({ color: 0x9aa0a8, metalness: 0.7, roughness: 0.4 }), 0.33 * s, 0.17, z); w.rotation.z = Math.PI / 2; const spoke = mesh(new THREE.BoxGeometry(0.03, 0.29, 0.16), dark); w.add(spoke); g.add(w); this.wheels.push(w); } }
    this.body = new THREE.Group(); this.body.position.y = 0.55; g.add(this.body);
    const b = mesh(new THREE.CapsuleGeometry(0.25, 0.2, 6, 16), white); b.scale.set(1.08, 1, 0.92); this.body.add(b);
    const band = mesh(new THREE.TorusGeometry(0.262, 0.03, 8, 24), orange, 0, -0.1, 0); band.rotation.x = Math.PI / 2; band.scale.set(1.08, 0.92, 1); this.body.add(band);
    const cl = mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.05, 14), std({ color: 0x222222, emissive: 0xffd9a0, emissiveIntensity: 2.5 }), 0, 0.04, 0.235); cl.rotation.x = Math.PI / 2; this.body.add(cl);
    const pt = eyeCanvas(64, 64, (c) => { c.fillStyle = '#0c1a3c'; c.fillRect(0, 0, 64, 64); c.strokeStyle = '#7fa0e0'; for (let i = 0; i <= 4; i++) { c.beginPath(); c.moveTo(i * 16, 0); c.lineTo(i * 16, 64); c.moveTo(0, i * 16); c.lineTo(64, i * 16); c.stroke(); } });
    const sp = mesh(new THREE.BoxGeometry(0.36, 0.32, 0.03), std({ map: pt, roughness: 0.3, metalness: 0.4 }), 0, 0.08, -0.27); sp.rotation.x = 0.3; this.body.add(sp);
    this.arms = []; for (const s of [-1, 1]) { const a = new THREE.Group(); a.position.set(0.3 * s, 0.08, 0.02); this.body.add(a); a.add(mesh(new THREE.CapsuleGeometry(0.045, 0.2, 4, 8), white, 0, -0.13, 0)); a.add(mesh(new THREE.SphereGeometry(0.06, 8, 6), dark, 0, -0.28, 0)); a.rotation.z = 0.25 * s; this.arms.push(a); }
    g.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.16, 10), dark, 0, 0.9, 0));
    this.head = new THREE.Group(); this.head.position.y = 1.08; g.add(this.head);
    const h = mesh(new THREE.SphereGeometry(0.25, 24, 16), white); h.scale.set(1.3, 0.86, 0.98); this.head.add(h);
    for (const s of [-1, 1]) { const e = mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.05, 12), orange, 0.325 * s, 0, 0); e.rotation.z = Math.PI / 2; this.head.add(e); }
    this.eyeCanvas = document.createElement('canvas'); this.eyeCanvas.width = 256; this.eyeCanvas.height = 128; this.eyeTex = new THREE.CanvasTexture(this.eyeCanvas); this.eyeTex.colorSpace = THREE.SRGBColorSpace;
    const vis = new THREE.Mesh(new THREE.SphereGeometry(0.254, 24, 12, Math.PI / 2 - 0.86, 1.72, Math.PI / 2 - 0.5, 1.0), new THREE.MeshBasicMaterial({ map: this.eyeTex })); vis.scale.set(1.3, 0.86, 0.98); this.head.add(vis);
    this.head.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.2, 6), dark, 0.1, 0.3, 0));
    this.tipMat = std({ color: 0x221100, emissive: 0xffa424, emissiveIntensity: 2 }); this.head.add(mesh(new THREE.SphereGeometry(0.035, 8, 6), this.tipMat, 0.1, 0.41, 0));
    this.mood = 'happy'; this.t = 0; this.blinkAt = 2; this.wave = 0; this.talk = 0; this.drawEyes('happy');
  }
  setMood(m) { if (m !== this.mood) { this.mood = m; this.drawEyes(m); } }
  drawEyes(m) {
    const c = this.eyeCanvas.getContext('2d'), W = 256, H = 128; c.fillStyle = '#05090d'; c.fillRect(0, 0, W, H);
    const col = m === 'alert' ? '#ffb02e' : m === 'sad' ? '#6fb6d9' : '#49e6ff'; c.fillStyle = col; c.strokeStyle = col; c.shadowColor = col; c.shadowBlur = 16; c.lineWidth = 11; c.lineCap = 'round';
    for (const x of [82, 174]) {
      const s = x < 128 ? -1 : 1;
      if (m === 'blink') { c.beginPath(); c.moveTo(x - 20, 66); c.lineTo(x + 20, 66); c.stroke(); }
      else if (m === 'joy') { c.beginPath(); c.arc(x, 78, 22, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); }
      else if (m === 'worried') { c.beginPath(); c.ellipse(x, 70, 15, 20, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(x - 22 * s, 30); c.lineTo(x + 16 * s, 40); c.stroke(); }
      else if (m === 'alert') { c.beginPath(); c.ellipse(x, 66, 21, 27, 0, 0, 7); c.fill(); c.fillStyle = '#05090d'; c.beginPath(); c.arc(x, 66, 8, 0, 7); c.fill(); c.fillStyle = col; }
      else if (m === 'think') { c.beginPath(); c.ellipse(x, 62 + (x < 128 ? 0 : 8), 17, x < 128 ? 22 : 13, 0, 0, 7); c.fill(); }
      else { c.beginPath(); c.ellipse(x, 66, 18, 24, 0, 0, 7); c.fill(); }
    }
    this.eyeTex.needsUpdate = true;
  }
  // speed: how fast the page is scrolling (it turns his treads); look: where he should look, -1 (left) to 1 (right)
  update(dt, speed = 0, look = 0, lookUp = 0) {
    this.t += dt;
    if (this.t > this.blinkAt) { this.drawEyes('blink'); this.blinkAt = this.t + 2.5 + Math.random() * 3; setTimeout(() => this.drawEyes(this.mood), 130); }
    const sp = Math.min(Math.abs(speed), 6); for (const w of this.wheels) w.rotation.x += speed * dt * 2.2;
    this.body.position.y = 0.55 + Math.sin(this.t * 2.4) * 0.012 + sp * 0.004 * Math.sin(this.t * 22); this.group.rotation.x += (-Math.max(-1, Math.min(1, speed / 6)) * 0.12 - this.group.rotation.x) * Math.min(1, dt * 6);   // he leans into the scroll
    this.head.rotation.y += (look * 0.7 - this.head.rotation.y) * Math.min(1, dt * 5); this.head.rotation.x += (-lookUp * 0.3 - this.head.rotation.x) * Math.min(1, dt * 5); this.head.rotation.z = Math.sin(this.t * 0.9) * 0.05;
    this.talk = Math.max(0, this.talk - dt); this.tipMat.emissiveIntensity = this.mood === 'alert' || this.mood === 'worried' ? 2 + Math.sin(this.t * 14) * 2 : this.talk > 0 ? 2.2 + Math.sin(this.t * 18) * 1.6 : 1.2 + Math.sin(this.t * 2) * 0.8;
    if (this.wave > 0) { this.wave -= dt; this.arms[1].rotation.z = 2.4 + Math.sin(this.t * 14) * 0.35; this.arms[0].rotation.z = this.mood === 'joy' ? -2.4 - Math.sin(this.t * 14) * 0.35 : -0.25; }
    else { this.arms[1].rotation.z += (0.25 - this.arms[1].rotation.z) * 0.15; this.arms[0].rotation.z += (-0.25 - this.arms[0].rotation.z) * 0.15; this.arms[0].rotation.x = this.arms[1].rotation.x = Math.sin(this.t * 3) * 0.1 * Math.min(1, sp) + (this.talk > 0 ? Math.sin(this.t * 7) * 0.12 : 0); }
  }
}

const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const store = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: the choice just lasts for this visit */ } } };

// host: an empty element. menu: [[label, run]] for the buttons that open when REGO is clicked.
// REGO does not stay in one corner. go('L' | 'M' | 'R') sends REGO rolling along the bottom of the screen to another
// place: a dash when it is far, slower as it gets near; and when left alone REGO shuffles about a little.
export function createRegoGuide(host, { still = false, small = false, menu = [] } = {}) {
  host.innerHTML = ''; host.classList.add('rego');
  const bubble = el('div', 'rego-bubble'), text = el('p'), panel = el('div', 'rego-menu'), car = el('div', 'rego-car'), bodyBtn = el('button', 'rego-body'), cv = el('canvas'), tools = el('div', 'rego-tools'), quiet = el('button', '', 'Quiet'), tuck = el('button', '', 'Hide');
  bubble.setAttribute('role', 'status'); bubble.setAttribute('aria-live', 'polite'); bubble.appendChild(text); panel.hidden = true; bodyBtn.type = quiet.type = tuck.type = 'button'; bodyBtn.setAttribute('aria-label', 'REGO, your guide. Open the menu.'); bodyBtn.setAttribute('aria-expanded', 'false');
  quiet.setAttribute('aria-pressed', 'false'); quiet.title = 'Stop REGO talking (REGO stays on screen)'; tuck.title = 'Tuck REGO away'; bodyBtn.appendChild(cv); tools.append(quiet, tuck); car.append(bodyBtn, tools); host.append(bubble, panel, car);
  panel.appendChild(el('p', 'rego-menu-h', 'Where to, Commander?')); for (const [label, run] of menu) { const b = el('button', '', label); b.type = 'button'; b.onclick = () => { toggleMenu(false); run(); }; panel.appendChild(b); }

  // the little 3D stage REGO stands on
  let renderer = null, scene = null, camera = null, rego = null;
  try { renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.outputColorSpace = THREE.SRGBColorSpace;
    scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20); camera.position.set(0.9, 1.25, 3.9); camera.lookAt(0, 0.72, 0);
    const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(2, 3, 3); const rim = new THREE.DirectionalLight(0x62ddf3, 1.6); rim.position.set(-3, 2, -2); scene.add(key, rim, new THREE.HemisphereLight(0xdfe8ff, 0x20242c, 1.1));
    rego = new Rego(); rego.group.rotation.y = -0.25; scene.add(rego.group); } catch (err) { cv.replaceWith(el('span', 'rego-flat', 'REGO')); }

  // ---- where REGO is: x runs along the bottom strip, from 0 (left) to W - bw (right) ----
  let W = 0, bw = 0, x = 0, tx = 0, home = 0, place = 'L', moving = false, shuffling = false, idle = 0, nextShuffle = 6, drive = 0, faceTo = -0.25;
  const measure = () => { W = host.clientWidth || innerWidth - 28; bw = bodyBtn.offsetWidth || (small ? 78 : 112); };
  const spot = (p) => (p === 'R' || (p === 'M' && W < 700) ? W - bw : p === 'M' ? (W - bw) / 2 : 0);
  // put the car at x, and the speech bubble and the menu on the side of it that has room
  function seat() { const right = x + bw / 2 > W / 2 + 1; car.style.transform = 'translateX(' + x.toFixed(1) + 'px)'; car.classList.toggle('right', right);
    for (const b of [bubble, panel]) { b.classList.toggle('flip', right); b.style.left = right ? 'auto' : Math.round(x + bw + 6) + 'px'; b.style.right = right ? Math.round(W - x + 6) + 'px' : 'auto'; b.style.maxWidth = Math.max(150, Math.min(318, right ? x - 6 : W - x - bw - 6)) + 'px'; } }
  const fit = () => { measure(); home = spot(place); x = tx = home; moving = shuffling = false; seat(); if (!renderer) return; const w = cv.clientWidth || 120, h = cv.clientHeight || 140; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }; fit(); addEventListener('resize', fit);

  // ---- what REGO says ----
  let line = '', typing = 0, isQuiet = store.get('rego-quiet') === '1', hidden = store.get('rego-hidden') === '1', speak = false, look = 0, lookUp = 0, speed = 0;
  function show(t) { clearInterval(typing); if (still || t.length < 4) { text.textContent = t; return; } let n = 0; text.textContent = ''; typing = setInterval(() => { n += 2; text.textContent = t.slice(0, n); if (n >= t.length) clearInterval(typing); }, 18); }
  function say(t, mood = 'happy') {
    if (!t || t === line) return; line = t; if (rego) { rego.setMood(mood); rego.talk = Math.min(4, 0.6 + t.length * 0.03); if (mood === 'joy') rego.wave = 1.3; }
    if (isQuiet || hidden) return; if (!moving) { bubble.classList.add('on'); show(t); }   // on the move: the line is shown on arrival
    if (speak && 'speechSynthesis' in window) { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.rate = 1.05; u.pitch = 1.35; u.volume = 0.9; speechSynthesis.speak(u); } catch (e) { /* no voice on this device */ } }
  }
  function toggleMenu(open = panel.hidden) { panel.hidden = !open; bodyBtn.setAttribute('aria-expanded', String(open)); if (open && rego) rego.wave = 0.9; if (open) { shuffling = false; tx = x; } }
  function setQuiet(q) { isQuiet = q; store.set('rego-quiet', q ? '1' : '0'); quiet.setAttribute('aria-pressed', String(q)); quiet.textContent = q ? 'Talk' : 'Quiet'; bubble.classList.toggle('on', !q && !hidden && !!line && !moving); if (!q && line && !moving) show(line); if (q && 'speechSynthesis' in window) speechSynthesis.cancel(); }
  function setHidden(hd) { hidden = hd; store.set('rego-hidden', hd ? '1' : '0'); host.classList.toggle('tucked', hd); tuck.textContent = hd ? 'REGO' : 'Hide'; tuck.title = hd ? 'Bring REGO back' : 'Tuck REGO away'; if (hd) { toggleMenu(false); bubble.classList.remove('on'); } else if (line && !isQuiet) { bubble.classList.add('on'); show(line); } fit(); }
  bodyBtn.onclick = () => toggleMenu(); quiet.onclick = () => setQuiet(!isQuiet); tuck.onclick = () => setHidden(!hidden);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) { toggleMenu(false); bodyBtn.focus(); } });
  setQuiet(isQuiet); setHidden(hidden);

  // ---- moving about ----
  function go(p) { if (!p || p === place) return; place = p; measure(); home = spot(p); shuffling = false;
    if (still || hidden || Math.abs(home - x) < 6) { x = tx = home; moving = false; seat(); return; }
    tx = home; moving = true; bubble.classList.remove('on'); toggleMenu(false); }
  function step(dt) { const d = tx - x, far = Math.abs(d);
    if (far < 0.6) { drive = 0;
      if (moving) { moving = false; x = tx; seat(); idle = 0; if (line && !isQuiet && !hidden) { bubble.classList.add('on'); show(line); } }
      shuffling = false; faceTo = x + bw / 2 > W / 2 + 1 ? -0.5 : 0.3; idle += dt;
      // left alone for a while: a short, slow shuffle to one side and, next time, back home
      if (idle > nextShuffle && panel.hidden && !hidden) { idle = 0; nextShuffle = 5 + Math.random() * 7; const out = Math.abs(x - home) > 2; const dir = home < 2 ? 1 : home > W - bw - 2 ? -1 : Math.random() < 0.5 ? -1 : 1;
        tx = out ? home : Math.max(0, Math.min(W - bw, home + dir * (18 + Math.random() * 38))); shuffling = true; }
      return; }
    // pace: a slow shuffle, a steady roll, or a dash when the place is far away; it always eases in at the end
    const v = shuffling ? 30 : Math.max(160, Math.min(1500, far * 3.6)), s = Math.sign(d); x += s * Math.min(far, v * dt); seat(); drive = s * v / 60; faceTo = s * (shuffling ? 0.75 : 1.25); }

  return {
    say, go, get quiet() { return isQuiet; }, get hidden() { return hidden; }, get place() { return place; },
    setSpeak(on) { speak = on; if (!on && 'speechSynthesis' in window) speechSynthesis.cancel(); },
    lookAt(lx, ly) { look = lx; lookUp = ly; }, roll(v) { speed = v; }, wave() { if (rego) rego.wave = 1.2; },
    // the middle of REGO on screen, and the box REGO and the speech bubble take up (so other things can keep clear)
    cx() { const r = car.getBoundingClientRect(); return r.left + r.width / 2; },
    box() { const a = car.getBoundingClientRect(); let left = a.left, right = a.right, top = a.top; const b = !panel.hidden ? panel : bubble.classList.contains('on') ? bubble : null; if (b) { const q = b.getBoundingClientRect(); left = Math.min(left, q.left); right = Math.max(right, q.right); top = Math.min(top, q.top); } return { left, right, top, width: right - left }; },
    frame(dt) { if (hidden) return; if (!still) step(Math.min(dt, 0.05)); if (!renderer) return; rego.group.rotation.y += (faceTo - rego.group.rotation.y) * Math.min(1, dt * 7); rego.update(still ? 0 : dt, still ? 0 : speed + drive, moving || shuffling ? 0 : look, lookUp); speed *= Math.pow(0.02, dt); renderer.render(scene, camera); },
  };
}
