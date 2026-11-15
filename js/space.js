// MOONKEEPER: Beyond Earth — the live 3D scene behind the page: stars, the spacecraft, Earth, the Moon and Mars.
// Sizes of the three worlds are to scale with each other (radius 1 : 0.273 : 0.532); the distances between them are not.
// Earth and Moon pictures are NASA's; the Mars globe is drawn from NASA's MOLA elevation data.
import * as THREE from '../lib/three.module.min.js';

const V3 = THREE.Vector3, lerp = (a, b, k) => a + (b - a) * k, ease = (t) => t * t * (3 - 2 * t);
export const PLACE = { earth: { pos: new V3(-8.2, 0, 0), r: 3 }, moon: { pos: new V3(-1.6, 1.5, -2.2), r: 0.82 }, mars: { pos: new V3(8.2, -0.4, -5), r: 1.6 } };
// Where the camera stands for each part of the page: [camera position, the point it looks at]
const CAMS = {
  open: [new V3(0, 1.2, 24), new V3(0, 0, 0)], worlds: [new V3(0.6, 1.6, 19), new V3(0, 0.5, -1.5)],
  earth: [new V3(-4.4, 1.2, 7.4), new V3(-8.2, 0, 0)], moon: [new V3(-0.2, 2.0, 1.0), new V3(-1.6, 1.5, -2.2)], mars: [new V3(5.6, 0.4, -0.4), new V3(8.2, -0.4, -5)],
  deep: [new V3(3, 5, 26), new V3(0, 0, -4)], final: [new V3(-2, 3, 22), new V3(0, 0, -2)],
};

export function createSpace(canvas, { small = false, still = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x030712);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 3000), look = new V3().copy(CAMS.open[1]); camera.position.copy(CAMS.open[0]);
  const sun = new THREE.DirectionalLight(0xfff4e6, 3.3); sun.position.set(-6, 5, 14); scene.add(sun, new THREE.AmbientLight(0x6f8fc0, 0.3));

  // stars: two shells, the nearer one slides a little as the camera moves
  const starLayer = (n, r0, r1, size, opacity) => { const p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const u = Math.random() * 2 - 1, a = Math.random() * 6.283, r = r0 + Math.random() * (r1 - r0), s = Math.sqrt(1 - u * u); p[i * 3] = Math.cos(a) * s * r; p[i * 3 + 1] = u * r; p[i * 3 + 2] = Math.sin(a) * s * r; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3)); const m = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xdfe8ff, size, sizeAttenuation: false, transparent: true, opacity, depthWrite: false })); scene.add(m); return m; };
  const starsFar = starLayer(small ? 1400 : 3200, 900, 1500, 1.3, 0.85), starsNear = starLayer(small ? 300 : 800, 300, 700, 2.1, 0.9);

  // the three worlds
  const tex = new THREE.TextureLoader(), map = (f) => { const t = tex.load(f); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
  const glow = (color, power, strength) => new THREE.ShaderMaterial({ uniforms: { c: { value: new THREE.Color(color) }, p: { value: power }, s: { value: strength } }, transparent: true, depthWrite: false, side: THREE.BackSide, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 n; varying vec3 v; void main(){ n = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); v = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'uniform vec3 c; uniform float p; uniform float s; varying vec3 n; varying vec3 v; void main(){ float f = pow(max(0.0, 0.72 - dot(n, v)), p); gl_FragColor = vec4(c, 1.0) * f * s; }' });
  const worlds = {};
  const addWorld = (id, file, air, tilt) => { const P = PLACE[id], g = new THREE.Group(); g.position.copy(P.pos); g.rotation.z = tilt;
    const ball = new THREE.Mesh(new THREE.SphereGeometry(P.r, small ? 48 : 96, small ? 32 : 64), (() => { const m = map(file); return new THREE.MeshStandardMaterial({ map: m, roughness: 1, metalness: 0, emissive: 0xffffff, emissiveMap: m, emissiveIntensity: 0.16 }); })()); g.add(ball);
    let halo = null; if (air) { halo = new THREE.Mesh(new THREE.SphereGeometry(P.r * 1.12, 48, 32), glow(air[0], air[1], air[2])); g.add(halo); }
    ball.rotation.y = id === 'earth' ? 4.4 : 0; scene.add(g); worlds[id] = { g, ball, halo, hot: 0 }; };   // Earth starts with the Americas toward us
  addWorld('earth', 'assets/tex/earth.jpg', [0x4aa8ff, 3.2, 0.5], 0.41); addWorld('moon', 'assets/tex/moon.jpg', null, 0.03); addWorld('mars', 'assets/tex/mars.jpg', [0xe08a5a, 4, 0.3], 0.44);

  // the spacecraft: white hull, dark canopy, two solar wings, four engines that glow blue (the same ship as in the films)
  const ship = new THREE.Group(); {
    const M = (o) => new THREE.MeshStandardMaterial(o), white = M({ color: 0xdfe3e8, roughness: 0.45, metalness: 0.35 }), dark = M({ color: 0x0b1220, roughness: 0.15, metalness: 0.8 }), orange = M({ color: 0xc9562a, roughness: 0.6 }), panel = M({ color: 0x2a4a9a, roughness: 0.35, metalness: 0.5, emissive: 0x0a1a44, emissiveIntensity: 0.6 });
    const add = (geo, m, x, y, z, rx = 0, ry = 0, rz = 0) => { const k = new THREE.Mesh(geo, m); k.position.set(x, y, z); k.rotation.set(rx, ry, rz); ship.add(k); return k; };
    add(new THREE.CylinderGeometry(0.42, 0.5, 2.6, 20), white, 0, 0, 0, Math.PI / 2); add(new THREE.SphereGeometry(0.42, 20, 14), white, 0, 0, -1.3); add(new THREE.SphereGeometry(0.34, 20, 14, 0, 6.283, 0, 1.25), dark, 0, 0.14, -1.42, -1.1);
    add(new THREE.CylinderGeometry(0.515, 0.515, 0.12, 20), orange, 0, 0, -0.35, Math.PI / 2); add(new THREE.CylinderGeometry(0.5, 0.56, 0.5, 20), M({ color: 0x8a919c, roughness: 0.5, metalness: 0.7 }), 0, 0, 1.5, Math.PI / 2);
    for (const s of [-1, 1]) { add(new THREE.BoxGeometry(2.3, 0.06, 0.9), panel, s * 1.75, 0, 0.1); add(new THREE.BoxGeometry(0.6, 0.04, 0.06), white, s * 0.6, 0, 0.1); add(new THREE.BoxGeometry(0.03, 0.7, 0.5), white, s * 0.3, 0.55, 0.9, 0, 0, s * -0.5); }
    ship.flames = []; for (const [x, y] of [[0.2, 0.2], [-0.2, 0.2], [0.2, -0.2], [-0.2, -0.2]]) { add(new THREE.CylinderGeometry(0.1, 0.17, 0.3, 14, 1, true), M({ color: 0x1a1f2a, roughness: 0.8, metalness: 0.2, side: THREE.DoubleSide }), x, y, 1.85, Math.PI / 2);
      ship.flames.push(add(new THREE.ConeGeometry(0.055, 0.8, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0x3fa8ff, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }), x, y, 2.5, Math.PI / 2)); }
    ship.lamp = new THREE.PointLight(0x6fd0ff, 2, 4, 2); ship.lamp.position.set(0, 0, 2.4); ship.add(ship.lamp); ship.scale.setScalar(0.62); scene.add(ship);
  }

  // ---- state ----
  let key = 'open', drag = { yaw: 0, pitch: 0 }, hot = null, trip = null, t = 0, w = 1, h = 1; const from = [new V3(), new V3()], want = [new V3(), new V3()], tmp = new V3(), dir = new V3(), ray = new THREE.Raycaster(), ptr = new THREE.Vector2(9, 9);
  const shipHome = new V3(0, -1.2, 9), shipAt = new V3().copy(shipHome), shipAim = new V3(0, 0, -30);
  function resize() { w = canvas.clientWidth || innerWidth; h = canvas.clientHeight || innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < h ? 58 : 42; camera.updateProjectionMatrix(); }
  resize(); addEventListener('resize', resize);

  const api = {
    worlds, camera,
    setCam(k) { if (CAMS[k]) key = k; },
    setDrag(yaw, pitch) { drag.yaw = Math.max(-0.7, Math.min(0.7, yaw)); drag.pitch = Math.max(-0.35, Math.min(0.35, pitch)); }, get drag() { return drag; },
    point(x, y) { ptr.set((x / w) * 2 - 1, -(y / h) * 2 + 1); },
    // which world is under the pointer?
    pick() { ray.setFromCamera(ptr, camera); let best = null, bd = Infinity; for (const id in worlds) { const hit = ray.intersectObject(worlds[id].ball)[0]; if (hit && hit.distance < bd) { bd = hit.distance; best = id; } } return best; },
    hover(id) { hot = id; },
    // where a world is on the screen (for its label): { x, y, r, shown }
    screen(id) { const P = PLACE[id]; tmp.copy(P.pos).project(camera); const x = ((tmp.x + 1) / 2) * w, y = ((1 - tmp.y) / 2) * h; tmp.copy(P.pos); tmp.y -= P.r; tmp.project(camera); return { x, y, bottom: ((1 - tmp.y) / 2) * h, shown: tmp.z < 1 }; },
    // fly to a world: the camera closes in, the ship leads; `done` runs when it gets there
    travel(id, done) { if (trip) return; from[0].copy(camera.position); from[1].copy(look); trip = { id, u: 0, done, t0: performance.now() }; },
    get travelling() { return !!trip; },
    frame(dt) {
      t += dt; const C = CAMS[key]; want[0].copy(C[0]); want[1].copy(C[1]);
      // on a tall screen the camera stands further back, so all three worlds fit
      if (key === 'worlds') { const a = drag.yaw, r = want[0].length() * (w < h ? 2.3 : w < h * 1.3 ? 1.4 : 1); want[0].set(Math.sin(a) * r + 0.6 * Math.cos(a), 1.6 + drag.pitch * 14, Math.cos(a) * r); }
      if (trip) { trip.u = Math.min(1, (performance.now() - trip.t0) / 1500); const k = ease(trip.u), T = CAMS[trip.id]; camera.position.lerpVectors(from[0], T[0], k); look.lerpVectors(from[1], T[1], k); if (trip.u >= 1) { const d = trip.done; trip = null; d && d(); } }
      else { const k = still ? 1 : 1 - Math.exp(-dt * 2.2); camera.position.lerp(want[0], k); look.lerp(want[1], k); }
      camera.lookAt(look);
      for (const id in worlds) { const W = worlds[id]; W.ball.rotation.y += dt * (id === 'earth' ? 0.05 : id === 'moon' ? 0.012 : 0.04) * (still ? 0 : 1); W.hot += ((hot === id ? 1 : 0) - W.hot) * Math.min(1, dt * 6); const s = 1 + W.hot * 0.045; W.g.scale.setScalar(s); if (W.halo) W.halo.material.uniforms.s.value = (id === 'earth' ? 0.5 : 0.3) * (1 + W.hot * 0.9); W.ball.material.emissiveIntensity = 0.16 + W.hot * 0.22; }
      // the ship rides ahead of the camera, turned toward wherever we are bound
      const goal = trip ? PLACE[trip.id].pos : key === 'earth' || key === 'moon' || key === 'mars' ? PLACE[key].pos : hot ? PLACE[hot].pos : null;
      dir.subVectors(look, camera.position).normalize(); tmp.copy(camera.position).addScaledVector(dir, key === 'worlds' || trip ? 7.5 : 9); tmp.y -= 1.7; tmp.x += 0.2;
      shipAt.lerp(tmp, Math.min(1, dt * (trip ? 3 : 1.6))); ship.position.copy(shipAt); ship.position.y += Math.sin(t * 0.7) * 0.05;
      shipAim.lerp(goal || dir.multiplyScalar(60).add(camera.position), Math.min(1, dt * 1.8)); ship.lookAt(shipAim); ship.rotateY(Math.PI);   // its nose is its -z end
      const burn = trip ? 1 : 0.35 + 0.1 * Math.sin(t * 9); for (const f of ship.flames) { f.scale.set(1, 0.5 + burn * 1.6, 1); f.material.opacity = 0.12 + burn * 0.3; } ship.lamp.intensity = 1 + burn * 5;
      starsNear.position.copy(camera.position).multiplyScalar(0.85); starsFar.position.copy(camera.position);
      renderer.render(scene, camera);
    },
  };
  return api;
}
