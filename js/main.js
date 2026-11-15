// MOONKEEPER: Beyond Earth — the page's behaviour: the scroll-driven films, the three worlds, the exhibits, the sound.
// Scrolling drives everything and works backwards as well as forwards. If the 3D scene, a film or the animation
// library fails to load, the page is still readable and every button still works.
import { WORLDS, TIMELINE, ROOMS, JOBS, MOON_REEL, MARS_REEL, MARS_CARDS, GAME_TABS, MODES, KEYS, FLOW, SI_LIST, ARCH, COMPARE, QUIZ, KIND, SOURCES, THEMES, REGO_CUES, REGO_SPOTS, GAME } from './data.js';

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
// Full motion on every device, whatever the device's own setting; the visitor's choice (top right) decides.
const still = document.documentElement.classList.contains('calm'), small = matchMedia('(max-width: 900px)').matches || navigator.maxTouchPoints > 1 && innerWidth < 1100;
if (!window.gsap) document.documentElement.classList.add('no-gsap');
// go to a height at once (older Safari has no 'instant', and the page's smooth scrolling would otherwise glide there)
const jump = (y) => { const h = document.documentElement, was = h.style.scrollBehavior; h.style.scrollBehavior = 'auto'; scrollTo(0, y); h.style.scrollBehavior = was; };

// ------------------------------------------------------------------ the parts of the page that are made from data
const pick = (list, host, detail, render) => { const btns = list.map((item, i) => { const li = el('li'), b = el('button', '', item[0]); b.type = 'button'; b.setAttribute('aria-pressed', 'false'); b.onclick = () => { btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b))); detail.innerHTML = render(item, i); }; li.appendChild(b); host.appendChild(li); return b; }); btns[0].click(); };
pick(TIMELINE, $('#timeline'), $('#timeline-detail'), ([t, d], i) => `<b>${i + 1}. ${t}</b><p>${d}</p>`);
pick(FLOW, $('#flow'), $('#flow-detail'), ([t, d]) => `<b>${t}</b><p>${d}</p>`);
{ const host = $('#station'), info = $('#station-info'), btns = []; const row = (rooms) => rooms.forEach(([name, what], i) => { const b = el('button', rooms.length === 5 && i === 4 ? 'w2' : '', name); b.type = 'button'; b.setAttribute('aria-pressed', 'false'); b.onclick = () => { btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b))); info.innerHTML = `<b>${name}</b><p>${what}</p>`; }; btns.push(b); host.appendChild(b); });
  row(ROOMS.north); host.appendChild(el('div', 'tube', 'the lava tube · airlock at the west end')); row(ROOMS.south); btns[3].click(); }
$('#jobs').innerHTML = JOBS.map((j) => `<li>${j}</li>`).join('');
const reel = (host, list) => { host.innerHTML = list.map(([f, cap]) => `<figure><video class="loop" data-src="assets/clips/${f}.mp4" poster="assets/clips/${f}.jpg" muted loop playsinline preload="none"></video><figcaption>${cap}</figcaption></figure>`).join(''); };
reel($('#moon-reel'), MOON_REEL); reel($('#mars-reel'), MARS_REEL);
$('#mars-cards').innerHTML = MARS_CARDS.map(([n, t, d, k]) => `<div class="card"><span class="num">${n}</span><h3>${t}</h3><p>${d}</p><p class="tags"><span class="tag ${k}">${KIND[k]}</span></p></div>`).join('');
{ const tabs = $('#game-tabs'), panel = $('#game-panel'); const btns = GAME_TABS.map(([name, clip, head, text], i) => { const b = el('button', '', name); b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', 'false'); b.onclick = () => { btns.forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    panel.innerHTML = `<video data-src="assets/clips/${clip}.mp4" src="assets/clips/${clip}.mp4" poster="assets/clips/${clip}.jpg" muted loop playsinline autoplay></video><div><h3>${head}</h3><p>${text}</p><p class="fine">The clip is recorded from the game.</p></div>`; if (still) panel.querySelector('video').removeAttribute('autoplay'); }; tabs.appendChild(b); return b; });
  // the first tab is filled in when the section comes near, so its clip is not fetched at page load
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { btns[0].click(); io.disconnect(); } }, { rootMargin: '600px' }); io.observe(panel); }
$('#modes').innerHTML = MODES.map(([n, who, len]) => `<li><b>${n}</b> · ${who} · ${len}</li>`).join('');
$('#keys').innerHTML = KEYS.map(([k, d]) => `<dt>${k}</dt><dd>${d}</dd>`).join('');
$('#si-list').innerHTML = SI_LIST.map(([who, what]) => `<li><b>${who}</b> ${what}</li>`).join('');
$('#arch').innerHTML = ARCH.map(([f, d]) => `<li><code>${f}</code><span>${d}</span></li>`).join('');
$('#compare').innerHTML = `<table><thead><tr><th></th><th class="e">Earth</th><th class="m">Moon</th><th class="r">Mars</th></tr></thead><tbody>${COMPARE.map(([name, ...cols]) => `<tr><th scope="row">${name}</th>${cols.map(([v, note]) => `<td>${v}${note ? `<small>${note}</small>` : ''}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
$('#sources').innerHTML = SOURCES.map(([name, url, note]) => `<li><a href="${url}" target="_blank" rel="noopener">${name}</a><small>${note}</small></li>`).join('');
$('#themes').innerHTML = THEMES.map(([t, d]) => `<div class="card"><h3>${t}</h3><p>${d}</p></div>`).join('');
{ const host = $('#rof'); let i = 0, right = 0, asked = 0; const show = () => { const [q] = QUIZ[i]; host.innerHTML = `<p class="q">${q}</p><div class="a">${Object.entries(KIND).map(([k, v]) => `<button class="btn small ghost" type="button" data-k="${k}">${v}</button>`).join('')}</div><p class="why" role="status" aria-live="polite">Question ${i + 1} of ${QUIZ.length}</p>`;
    $$('button', host).forEach((b) => (b.onclick = () => { const [, kind, why] = QUIZ[i]; asked++; if (b.dataset.k === kind) right++; $$('button', host).forEach((x) => { x.disabled = true; if (x.dataset.k === kind) x.classList.remove('ghost'); });
      $('.why', host).innerHTML = `<b>${b.dataset.k === kind ? 'Right.' : 'Not quite: ' + KIND[kind].toLowerCase() + '.'}</b> ${why} <button class="btn small" type="button" id="rof-next">${i + 1 < QUIZ.length ? 'Next' : 'Start again'}</button> <span class="fine">${right} of ${asked} right</span>`;
      $('#rof-next').onclick = () => { i = (i + 1) % QUIZ.length; if (!i) { right = 0; asked = 0; } show(); }; })); }; show(); }
$('#hail').onclick = (e) => { const c = $('#channels'); c.hidden = !c.hidden; e.currentTarget.setAttribute('aria-expanded', String(!c.hidden)); e.currentTarget.textContent = c.hidden ? 'Establish contact' : 'Channel open'; };

// ------------------------------------------------------------------ the journey rail and the top bar
const sections = $$('main > section'), rail = $('#rail');
sections.forEach((s) => { const li = el('li'), a = el('a', '', `<span>${s.dataset.name}</span><i></i>`); a.href = '#' + s.id; li.appendChild(a); rail.appendChild(li); s._rail = a; });

// ------------------------------------------------------------------ films: fetched only when they come near
// A film that follows the scroll is never "played", and iPhones and iPads draw nothing until a film has played once:
// so each one is started and stopped again, silently, as soon as it has loaded.
const prime = (v) => { if (v._primed || !v.classList.contains('scrub')) return; v._primed = true; const p = v.play(); if (p && p.then) p.then(() => v.pause()).catch(() => {}); };
// Films load two at a time, the one on screen first: a browser asked for ten films at once shows none of them for a long while.
const queue = []; let loading = 0;
function pump() { while (loading < 2 && queue.length) { const v = queue.shift(); if (v.getAttribute('src')) continue; loading++; let over = false; const done = () => { if (over) return; over = true; loading--; pump(); };
  v.preload = 'auto'; v.setAttribute('webkit-playsinline', ''); v.disableRemotePlayback = true;
  v.addEventListener('loadeddata', () => { prime(v); if (v._want) v.play().catch(() => {}); done(); }, { once: true }); v.addEventListener('error', done, { once: true }); setTimeout(done, 9000);
  v.src = (small && v.dataset.srcSmall) || v.dataset.src; v.load(); } }
const wake = (v, first) => { if (!v || !v.dataset.src || v.getAttribute('src')) return; const i = queue.indexOf(v); if (i >= 0) { if (!first) return; queue.splice(i, 1); } if (first) queue.unshift(v); else queue.push(v); pump(); };
const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { $$('video.scrub', e.target).forEach((v) => wake(v, v.classList.contains('on'))); near.unobserve(e.target); } }), { rootMargin: '120% 0px' });
$$('.cine').forEach((x) => near.observe(x));
const play = new IntersectionObserver((es) => es.forEach((e) => { const v = e.target; v._want = e.isIntersecting && !still; if (e.isIntersecting) wake(v, !still); if (v._want) { if (v.getAttribute('src')) v.play().catch(() => {}); } else if (v.getAttribute('src')) v.pause(); }), { threshold: 0.2, rootMargin: '12% 0px' });
const watchLoops = () => $$('video.loop').forEach((v) => play.observe(v)); watchLoops();
if (still) $$('video.loop').forEach((v) => { v.controls = true; });

// ------------------------------------------------------------------ the 3D scene
let space = null;
try { const { createSpace } = await import('./space.js'); space = createSpace($('#space'), { small, still }); } catch (err) { console.warn('3D scene not available:', err); $('#space').style.display = 'none'; }

// ------------------------------------------------------------------ REGO: always there, with something to say about wherever you are
let rego = null;
try { const { createRegoGuide } = await import('./rego.js'); const to = (id) => () => jump($(id).offsetTop);
  rego = createRegoGuide($('#rego'), { still, small, menu: [['Earth', to('#earth')], ['Moon', to('#moon')], ['Mars', to('#mars')], ['The game', to('#game')], ['Science', to('#science')], ['How it was built', to('#built')], ['Contact', to('#contact')], ['Play MOONKEEPER', () => window.open(GAME, '_blank', 'noopener')]] }); } catch (err) { console.warn('REGO not available:', err); $('#rego').remove(); }
const cues = REGO_CUES.map(([sel, text, mood, a, b], i) => ({ el: $(sel), text, mood, a, b, place: REGO_SPOTS[i] || 'L' })).filter((c) => c.el);
function regoCue(vh) { if (!rego) return; if (hot) return rego.say(WORLDS[hot].say, 'think'); let pickd = null; const mid = vh * 0.55;
  for (const c of cues) { const r = c.el.getBoundingClientRect(); if (r.top > mid || r.bottom < mid) continue; if (c.a != null) { const p = clamp(-r.top / Math.max(1, c.el.offsetHeight - vh), 0, 1); if (p < c.a || p >= c.b) continue; } pickd = c; }
  if (pickd) { rego.go(pickd.place); rego.say(pickd.text, pickd.mood); } }

// ------------------------------------------------------------------ scroll: one pass each frame
const cines = $$('.cine').map((sec) => ({ sec, vids: $$('video.scrub', sec), beats: $$('.beat', sec).map((b) => [b, parseFloat(b.dataset.at), b.dataset.until ? parseFloat(b.dataset.until) : 9]), cur: -1 }));
const labels = $('#world-labels'), info = $('#world-info'), wl = Object.fromEntries($$('.wl').map((b) => [b.dataset.world, b])), veil = $('#veil');
let active = null, hot = null, lastY = -1, dragging = null;
const prog = document.body.appendChild(Object.assign(document.createElement('div'), { id: 'progress' })); prog.setAttribute('aria-hidden', 'true');
function onScroll() {
  const y = scrollY, vh = innerHeight, mid = y + vh * 0.5;
  // which part of the journey are we in?
  let cur = sections[0]; for (const s of sections) if (s.offsetTop <= mid) cur = s;
  // the Moon and Mars sections hold a film stage and then pages: use the film's camera only while the film is on screen
  if (cur !== active) { active = cur; sections.forEach((s) => s._rail.classList.toggle('on', s === cur)); $$('#bar nav a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + cur.id)); space && !space.travelling && space.setCam(cur.dataset.cam); }
  const inWorlds = cur.id === 'worlds'; labels.classList.toggle('on', inWorlds); if (!inWorlds && hot) setHot(null);
  // the films follow the scroll: forwards and backwards
  for (const c of cines) { const r = c.sec.getBoundingClientRect(), span = c.sec.offsetHeight - vh; if (r.bottom < -vh || r.top > vh * 2) continue; const p = clamp(-r.top / Math.max(1, span), 0, 1), n = c.vids.length, k = Math.min(n - 1, Math.floor(p * n));
    if (k !== c.cur) { c.cur = k; c.vids.forEach((v, i) => v.classList.toggle('on', i === k)); wake(c.vids[k], true); wake(c.vids[k + 1]); } c.want = clamp(p * n - k, 0, 1); for (const [b, at, until] of c.beats) b.classList.toggle('in', p >= at && p < until); }
  if (rego && lastY >= 0) rego.roll((y - lastY) / 14);   // his treads turn with the page
  regoCue(vh); lastY = y; prog.style.transform = 'scaleX(' + clamp(y / Math.max(1, document.documentElement.scrollHeight - vh), 0, 1).toFixed(4) + ')';
}
// a film is moved toward the wanted moment a little at a time, so fast scrolling stays smooth
function scrub() { for (const c of cines) { const v = c.vids[c.cur]; if (!v || c.want == null || still) continue;
  for (const j of [c.cur - 1, c.cur + 1]) { const o = c.vids[j]; if (!o || o.readyState < 2 || !o.duration || o.seeking) continue; const park = j < c.cur ? o.duration - 0.05 : 0; if (Math.abs(o.currentTime - park) > 0.04) o.currentTime = park; }
  if (v.readyState < 2 || !v.duration) { wake(v, true); continue; } const t = c.want * (v.duration - 0.05), d = t - v.currentTime; if (Math.abs(d) > 0.02 && !v.seeking) v.currentTime = Math.abs(d) < 0.06 ? t : v.currentTime + d * 0.5; } }
addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);
{ const y = new URLSearchParams(location.search).get('y'); if (y) jump(+y); }
// the motion switch: remember the choice, reload in the other version, and come back to the same part of the page
{ const b = $('#motion'); if (b) { b.firstChild.textContent = still ? 'Full' : 'Reduce'; b.title = still ? 'Motion is reduced. Press for full motion.' : 'Press for a calm version: no pinned films, no moving parts.';
    b.onclick = () => { let kept = false; try { localStorage.setItem('moonweb-motion', still ? 'full' : 'reduced'); sessionStorage.setItem('moonweb-at', active ? active.id : ''); kept = true; } catch (e) { /* storage blocked: carry the choice in the address instead */ }
      if (kept && !/[?&]motion=/.test(location.search)) location.reload(); else location.href = location.pathname + (still ? '' : '?motion=reduced'); }; }
  let at = null; try { at = sessionStorage.getItem('moonweb-at'); sessionStorage.removeItem('moonweb-at'); } catch (e) { /* nothing to restore */ }
  const back = at && document.getElementById(at); if (back && back.offsetTop > 0) jump(back.offsetTop + 2); }   // ?y=1234 opens the page at that height (for links and for checking)
onScroll();

// ------------------------------------------------------------------ the three worlds: hover, click, drag
function setHot(id) { if (hot === id) return; hot = id; regoCue(innerHeight); space && space.hover(id); for (const k in wl) wl[k].classList.toggle('hot', k === id); info.textContent = id ? WORLDS[id].say : ''; info.classList.toggle('on', !!id); }
function go(id) {
  const target = $(WORLDS[id].to); if (!target) return; setHot(id);
  const arrive = () => { veil.style.opacity = 1; setTimeout(() => { jump(target.offsetTop); onScroll(); space && space.setCam(target.dataset.cam); veil.style.opacity = 0; }, still ? 0 : 420); };
  if (space && !still && active && active.id === 'worlds') space.travel(id, arrive); else arrive();
}
for (const k in wl) { wl[k].onclick = () => go(k); wl[k].onmouseenter = wl[k].onfocus = () => setHot(k); wl[k].onmouseleave = wl[k].onblur = () => setHot(null); }
$$('#bar nav a[data-world]').forEach((a) => (a.onclick = (e) => { if (active && active.id === 'worlds') { e.preventDefault(); go(a.dataset.world); } }));
const worldsSec = $('#worlds');
addEventListener('pointermove', (e) => { if (rego && e.pointerType !== 'touch') rego.lookAt(clamp(((e.clientX - rego.cx()) / innerWidth) * 2.2, -1, 1), clamp(((innerHeight - 90 - e.clientY) / innerHeight) * 1.6, -0.4, 1)); if (!space || !active || active.id !== 'worlds') return; if (dragging) { space.setDrag(dragging.yaw - (e.clientX - dragging.x) / 380, dragging.pitch + (e.clientY - dragging.y) / 900); dragging.moved = true; return; } if (e.target.closest('.wl, #bar, #rail')) return; space.point(e.clientX, e.clientY); setHot(space.pick()); });
worldsSec.addEventListener('pointerdown', (e) => { if (!space || e.target.closest('.wl')) return; dragging = { x: e.clientX, y: e.clientY, yaw: space.drag.yaw, pitch: space.drag.pitch, moved: false }; });
addEventListener('pointerup', (e) => { if (!dragging) return; const d = dragging; dragging = null; if (!d.moved && space && active && active.id === 'worlds') { space.point(e.clientX, e.clientY); const id = space.pick(); if (id) go(id); } });
const regoHost = $('#rego');
// A world's label sits under its globe, but never under REGO and his speech bubble.
function placeLabels() { if (!space || !labels.classList.contains('on')) return; const rb = rego && !rego.hidden ? rego.box() : null; for (const k in wl) { const s = space.screen(k); let ly = s.bottom + 14; if (rb && rb.width && s.x + 95 > rb.left && s.x - 95 < rb.right && ly + wl[k].offsetHeight > rb.top - 10) ly = rb.top - 10 - wl[k].offsetHeight; wl[k].style.transform = `translate(-50%,0) translate(${s.x.toFixed(1)}px,${ly.toFixed(1)}px)`; wl[k].style.visibility = s.shown ? 'visible' : 'hidden'; } }

// ------------------------------------------------------------------ exhibits
// the lunar day: sunlight on the panels and an example battery, over 29.5 Earth days
{ const box = $('#night'), cv = $('canvas', box), g = cv.getContext('2d'), inp = $('input', box), read = $('#night-read'), DAY = 29.5, SET = DAY / 2;
  const sunAt = (t) => (t < SET ? Math.sin((Math.PI * t) / SET) : 0), batt = (t) => (t < SET ? clamp(0.25 + 0.75 * (t / (SET * 0.8)), 0, 1) : clamp(1 - 0.82 * ((t - SET) / SET), 0, 1));
  const draw = () => { const t = +inp.value, W = cv.width, H = cv.height, x0 = 46, x1 = W - 16, y0 = 24, y1 = H - 44, X = (d) => x0 + (d / DAY) * (x1 - x0), Y = (v) => y1 - v * (y1 - y0);
    g.clearRect(0, 0, W, H); g.fillStyle = '#101a2c'; g.fillRect(X(SET), y0, x1 - X(SET), y1 - y0); g.fillStyle = 'rgba(244,189,106,.08)'; g.fillRect(x0, y0, X(SET) - x0, y1 - y0);
    g.font = '12px Inter, sans-serif'; g.fillStyle = '#93A1B5'; g.textAlign = 'center'; g.fillText('sunlight: about two weeks', (x0 + X(SET)) / 2, H - 24); g.fillText('night: about two weeks', (X(SET) + x1) / 2, H - 24); g.textAlign = 'left'; g.fillText('100%', 8, Y(1) + 4); g.fillText('0', 30, Y(0) + 4);
    const line = (f, col) => { g.strokeStyle = col; g.lineWidth = 2.5; g.beginPath(); for (let d = 0; d <= DAY; d += 0.1) { const x = X(d), y = Y(f(d)); d ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); };
    line(sunAt, '#f4bd6a'); line(batt, '#62DDF3'); g.fillStyle = '#f4bd6a'; g.fillText('solar panels', x0 + 8, y0 + 14); g.fillStyle = '#62DDF3'; g.fillText('battery (an example)', x0 + 8, y0 + 30);
    g.strokeStyle = '#F1F5F9'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(X(t), y0); g.lineTo(X(t), y1); g.stroke();
    read.textContent = t < SET ? `Day ${t.toFixed(1)}: the Sun is up. Panels at ${Math.round(sunAt(t) * 100)}% of full power; sunset in ${(SET - t).toFixed(1)} Earth days. This is the time to fill the battery and the oxygen tank.` : `Day ${t.toFixed(1)}: night. The panels make nothing and the ground is about −130 °C. Sunrise in ${(DAY - t).toFixed(1)} Earth days; the base lives on its battery and its small reactor.`; };
  inp.oninput = draw; draw(); }
// gravity: the same ball dropped from 5 m on three worlds
{ const cv = $('#grav'), g = cv.getContext('2d'), read = $('#grav-read'), G = [['Earth', 9.81, '#3D9BFF'], ['Moon', 1.62, '#D6DCE5'], ['Mars', 3.73, '#C96B44']], Hm = 5; let t0 = null;
  const fall = (gr) => Math.sqrt((2 * Hm) / gr); read.textContent = G.map(([n, gr]) => `${n} ${fall(gr).toFixed(2)} s`).join(' · ');
  const draw = (now) => { const t = t0 == null ? 99 : (now - t0) / 1000, W = cv.width, H = cv.height, top = 44, floor = H - 30, px = (floor - top) / Hm; g.clearRect(0, 0, W, H); g.font = '13px Inter, sans-serif'; g.textAlign = 'center';
    G.forEach(([name, gr, col], i) => { const x = W * (0.2 + 0.3 * i), tf = fall(gr), tt = Math.min(t, tf), y = top + 0.5 * gr * tt * tt * px; g.strokeStyle = 'rgba(214,220,229,.16)'; g.setLineDash([4, 5]); g.beginPath(); g.moveTo(x, top); g.lineTo(x, floor); g.stroke(); g.setLineDash([]);
      g.fillStyle = col; g.fillRect(x - 56, floor, 112, 5); g.beginPath(); g.arc(x, Math.min(y, floor) - 9, 9, 0, 7); g.fill(); g.fillStyle = '#F1F5F9'; g.fillText(name, x, 22); g.fillStyle = t >= tf ? '#7ee0a2' : '#93A1B5'; g.fillText(`${tt.toFixed(2)} s`, x, floor + 20); });
    if (t0 != null && t < fall(1.62) + 0.3) requestAnimationFrame(draw); };
  $('#grav-drop').onclick = () => { t0 = performance.now(); requestAnimationFrame(draw); }; draw(0); }
{ const inp = $('#o2-crew'), read = $('#o2-read'), show = () => { const n = +inp.value, kg = 0.84 * n; read.textContent = `${n} ${n === 1 ? 'person breathes' : 'people breathe'} ${kg.toFixed(2)} kg of oxygen a day. Made from water, that takes ${(kg * 9 / 8).toFixed(2)} litres a day.`; }; inp.oninput = show; show(); }

// ------------------------------------------------------------------ sound: off until asked for; made here, nothing to download
{ const btn = $('#sound'); let ctx = null, gain = null; const start = () => { ctx = new (window.AudioContext || window.webkitAudioContext)(); gain = ctx.createGain(); gain.gain.value = 0; gain.connect(ctx.destination);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 220; lp.connect(gain); for (const f of [55, 55.6, 82.4]) { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; const g = ctx.createGain(); g.gain.value = 0.16; o.connect(g); g.connect(lp); o.start(); }   // the engines: a low hum
    for (const [f, v] of [[220, 0.035], [329.6, 0.025], [440, 0.014]]) { const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f; const g = ctx.createGain(); g.gain.value = v; const l = ctx.createOscillator(); l.frequency.value = 0.07 + f / 9000; const lg = ctx.createGain(); lg.gain.value = v * 0.7; l.connect(lg); lg.connect(g.gain); o.connect(g); g.connect(gain); o.start(); l.start(); } };   // a quiet chord that breathes
  btn.onclick = () => { const on = btn.getAttribute('aria-pressed') !== 'true'; if (on && !ctx) start(); if (ctx) { ctx.resume(); gain.gain.linearRampToValueAtTime(on ? 0.5 : 0, ctx.currentTime + 0.6); } rego && rego.setSpeak(on); btn.setAttribute('aria-pressed', String(on)); btn.textContent = on ? 'Sound: on' : 'Sound: off'; btn.title = on ? 'Sound is on, and REGO speaks aloud. Click to mute.' : 'Sound is off. Turn on the engine hum, the music and REGO\'s voice.'; }; }

// ------------------------------------------------------------------ gentle entrances (only if the animation library arrived)
if (window.gsap && !still && 'IntersectionObserver' in window) {
  const fold = innerHeight * 0.94, later = (sel) => $$(sel).filter((x) => x.getBoundingClientRect().top > fold);
  const rise = (els, y, dur, gap) => { if (!els.length) return; gsap.set(els, { opacity: 0, y });
    const io = new IntersectionObserver((es) => { const b = es.filter((e) => e.isIntersecting).map((e) => e.target); if (!b.length) return; b.forEach((x) => io.unobserve(x)); gsap.to(b, { opacity: 1, y: 0, duration: dur, stagger: gap, ease: 'power3.out', overwrite: true, clearProps: 'transform,opacity' }); }, { rootMargin: '0px 0px -7% 0px' });
    els.forEach((x) => io.observe(x)); };
  rise(later('.scene-row, .console, .card, .trailer, .terminal, .reel figure, .tabpanel, .compare, .station, .author'), 40, 0.95, 0.08);
  rise(later('.wrap > .kicker, .wrap > h2, .wrap > p, .tabs, .timeline, .flow'), 24, 0.75, 0.06);
}
// a soft light follows the pointer across panels (devices with a pointer only)
if (!still && matchMedia('(hover: hover)').matches) addEventListener('pointermove', (e) => { const c = e.target.closest && e.target.closest('.card, .console, .terminal, .author, .tabpanel, .trailer'); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px'); c.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px'); }, { passive: true });

// ------------------------------------------------------------------ the frame loop
let last = performance.now();
function frame(now) { const dt = Math.min(0.05, (now - last) / 1000); last = now; scrub(); if (space) { space.frame(dt); placeLabels(); } if (rego) rego.frame(dt); requestAnimationFrame(frame); }
requestAnimationFrame(frame);
window.MOONWEB = { space, rego, go, onScroll, step: (dt = 0.016) => { scrub(); if (space) { space.frame(dt); placeLabels(); } if (rego) rego.frame(dt); } };   // for testing
