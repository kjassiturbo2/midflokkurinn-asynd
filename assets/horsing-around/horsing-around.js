// Horsing Around: Miðflokkurinn's retro variant.
// 1. <canvas class="dither"> inside a positioned Nótt element: a boiling dithered horse.
//    Optional data-horse (height × band), data-shift (visible share of width), data-top.
// 2. <canvas data-globe> (optional data-progress=0..100, data-mode="live"): the ASCII globe.
//    HorsingAround.setProgress(0..1) and HorsingAround.finish(done) drive it.
// horse.svg must sit next to this script. Everything stops for prefers-reduced-motion.
(() => {
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const horse = new Image();
horse.src = new URL('horse.svg', document.currentScript.src).href;
const HORSE_RATIO = 608.61 / 675.83;
const ready = new Promise(resolve => { horse.onload = resolve; });

/* ---- Header band: a boiling ordered dither, tone-on-tone on Nótt ---- */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + .5) / 16);
const CELL = 3;
let bands = [];

function setupBand(canvas) {
  const w = Math.ceil(canvas.clientWidth / CELL), h = Math.ceil(canvas.clientHeight / CELL);
  if (!w || !h) return null;
  canvas.width = w; canvas.height = h;
  const d = canvas.dataset;
  // Keep the horse off the text on narrow screens.
  const hh = Math.min(h * +(d.horse || 1.3), w * .45 / HORSE_RATIO), hw = hh * HORSE_RATIO;
  const hx = w - hw * +(d.shift || .75), hy = h * +(d.top || .08);
  const off = document.createElement('canvas');
  off.width = w; off.height = h;
  const o = off.getContext('2d');
  o.drawImage(horse, hx, hy, hw, hh);
  const mask = o.getImageData(0, 0, w, h).data, field = new Float32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, a = mask[i * 4 + 3] / 255;
    const glow = .015 + .06 * Math.max(0, 1 - Math.hypot((x - w * .85) / w, (y - h * .1) / h) * 1.3);
    const lit = .3 + .4 * Math.max(0, 1 - Math.hypot((x - hx) / hw - .35, (y - hy) / hh - .1) * 1.1);
    field[i] = glow * (1 - a) + lit * a;
  }
  const ctx = canvas.getContext('2d');
  return { ctx, img: ctx.createImageData(w, h), field, w, h };
}

function drawBand({ ctx, img, field, w, h }) {
  const px = img.data;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, k = i * 4, v = field[i];
    const on = v > BAYER[(x & 3) + (y & 3) * 4] + (Math.random() - .5) * .1;
    if (on && Math.random() < .0009) { px[k] = 219; px[k + 1] = 183; px[k + 2] = 101; px[k + 3] = 230; continue; } // a gold glint
    px[k] = px[k + 1] = px[k + 2] = 255;
    px[k + 3] = on ? 18 + v * 60 : 0;
  }
  ctx.putImageData(img, 0, 0);
}

function initBands() {
  bands = [...document.querySelectorAll('canvas.dither')].map(setupBand).filter(Boolean);
  bands.forEach(drawBand);
}

let lastBoil = 0;
function boil(t) {
  if (t - lastBoil > 110) { bands.forEach(drawBand); lastBoil = t; }
  requestAnimationFrame(boil);
}

/* ---- The globe: points on a sphere snapped to a character grid ---- */
const globe = document.querySelector('canvas[data-globe]');
const G = { progress: 0, live: false, level: 0, morph: 0, morphing: false };
const N = 1700, RAMP = ' .:-=+*#%@', points = [];
for (let i = 0; i < N; i++) {
  const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * Math.PI * (3 - Math.sqrt(5));
  points.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, tx: 0, ty: 0 });
}
const orbits = [
  { tilt: .5, yaw: .2, speed: .9, color: '#dbb765', a: 0, trail: [] },
  { tilt: -1, yaw: 1.4, speed: 1.25, color: '#6296bc', a: 2, trail: [] },
  { tilt: 1.3, yaw: 2.6, speed: .7, color: '#ffffff', a: 4, trail: [] },
];
const stars = Array.from({ length: 90 }, () => [Math.random(), Math.random(), Math.random()]);
let gx, gw, gh, cellW, cellH, last = 0, spin = 0, running = false;

function sizeGlobe() {
  const dpr = devicePixelRatio || 1;
  gw = globe.clientWidth; gh = globe.clientHeight;
  globe.width = gw * dpr; globe.height = gh * dpr;
  gx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cellW = Math.max(8, gw / 34); cellH = cellW * 1.55;
}

function horseTargets() {
  const s = 110, off = document.createElement('canvas');
  off.width = off.height = s;
  const o = off.getContext('2d'), hw = s * HORSE_RATIO;
  o.drawImage(horse, (s - hw) / 2, 0, hw, s);
  const data = o.getImageData(0, 0, s, s).data, inside = [];
  for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) if (data[(y * s + x) * 4 + 3] > 128) inside.push([x / s - .5, y / s - .5]);
  for (const p of points) [p.tx, p.ty] = inside[Math.floor(Math.random() * inside.length)];
}

function frame(t) {
  const dt = Math.min(.05, (t - last) / 1000 || 0);
  last = t;
  if (G.live) {
    // Decorative speech-like swell; not the real audio level.
    const target = Math.max(0, Math.sin(t / 310) * .5 + Math.sin(t / 97) * .35 + Math.sin(t / 1700) * .4);
    G.level += (target - G.level) * .15;
  }
  spin += dt * .35 * (1 + G.level);
  // Clock time, not frame count: slow or throttled frames must still land on the horse.
  if (G.morphing) G.morph = Math.min(1, Math.max(0, (t - G.morphStart) / 1800));
  const e = G.morph < .5 ? 2 * G.morph * G.morph : 1 - (-2 * G.morph + 2) ** 2 / 2;

  gx.clearRect(0, 0, gw, gh);
  for (const [sx, sy, phase] of stars) {
    gx.fillStyle = `rgba(255,255,255,${.08 + .12 * Math.abs(Math.sin(t / 900 + phase * 20))})`;
    gx.fillRect(sx * gw, sy * gh, 1.2, 1.2);
  }
  const cx = gw / 2, cy = gh / 2, R = gw * .36 * (1 + G.level * .07);
  const cos = Math.cos(spin), sin = Math.sin(spin), tc = Math.cos(.38), ts = Math.sin(.38);
  const cells = new Map();
  for (const p of points) {
    const x = p.x * cos + p.z * sin, z = -p.x * sin + p.z * cos;
    const y2 = p.y * tc - z * ts, z2 = p.y * ts + z * tc;
    const wobble = G.live ? 1 + G.level * .12 * Math.sin(p.x * 9 + t / 120) : 1;
    let px = cx + x * R * wobble, py = cy + y2 * R * wobble, bright = (z2 + 1) / 2;
    // Progress fills the globe from the bottom up.
    const dim = !G.live && (1 - p.y) / 2 > G.progress && e < .5;
    if (dim) bright *= .35;
    if (e > 0) { px += (cx + p.tx * gw * .86 - px) * e; py += (cy + p.ty * gh * .86 - py) * e; bright += (1 - bright) * e; }
    const col = Math.round(px / cellW), row = Math.round(py / cellH), key = col * 1000 + row;
    const prev = cells.get(key);
    if (!prev || prev.z < z2 || e > .5) cells.set(key, { x: col * cellW, y: row * cellH, z: z2, b: Math.max(prev ? prev.b : 0, bright), dim });
  }
  gx.font = `500 ${cellH * .82}px "IBM Plex Mono", monospace`;
  gx.textAlign = 'center'; gx.textBaseline = 'middle';
  // A gentle chromatic split: warm and cool fringes under the white characters.
  for (const [dx, fringe] of [[-1.2, 'rgba(219,183,101,.35)'], [1.2, 'rgba(98,150,188,.55)'], [0, null]]) {
    for (const c of cells.values()) {
      if (fringe && c.dim) continue;
      gx.fillStyle = fringe || (c.dim ? 'rgba(98,150,188,.55)' : `rgba(255,255,255,${.35 + c.b * .65})`);
      gx.fillText(RAMP[Math.min(RAMP.length - 1, Math.max(1, Math.round(c.b * (RAMP.length - 1))))], c.x + dx, c.y);
    }
  }
  const fade = 1 - e;
  if (fade > .01) for (const o of orbits) {
    o.a += dt * o.speed * (1 + G.level * 2.2);
    const ox = Math.cos(o.a), oy = Math.sin(o.a) * Math.cos(o.tilt), oz = Math.sin(o.a) * Math.sin(o.tilt);
    o.trail.unshift([cx + (ox * Math.cos(o.yaw) - oz * Math.sin(o.yaw)) * R * 1.12, cy + oy * R * 1.12, ox * Math.sin(o.yaw) + oz * Math.cos(o.yaw)]);
    o.trail.length = Math.min(o.trail.length, 34);
    o.trail.forEach(([x, y, z], i) => {
      const k = 1 - i / o.trail.length;
      gx.globalAlpha = fade * k * (z < 0 ? .35 : 1);
      gx.fillStyle = o.color;
      gx.beginPath(); gx.arc(x, y, 1 + k * 3.4 * (1 + G.level * .6), 0, 7); gx.fill();
    });
    gx.globalAlpha = 1;
  }
  if (running && (!reduce || G.morphing && G.morph < 1)) requestAnimationFrame(frame);
}

window.HorsingAround = {
  setProgress(value) { G.progress = value; if (reduce && running) requestAnimationFrame(frame); },
  // Fold the globe into the horse, then call done.
  finish(done) {
    if (!running || reduce) return done();
    horseTargets(); G.progress = 1; G.morphStart = performance.now(); G.morphing = true;
    setTimeout(done, 2600);
  },
};

ready.then(() => document.fonts.ready).then(() => {
  initBands();
  if (!reduce) requestAnimationFrame(boil);
  if (globe) {
    gx = globe.getContext('2d');
    G.progress = +(globe.dataset.progress || 0) / 100;
    G.live = globe.dataset.mode === 'live';
    running = true;
    sizeGlobe();
    requestAnimationFrame(frame);
  }
});
let resizeTimer;
addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { initBands(); if (running) { sizeGlobe(); if (reduce) requestAnimationFrame(frame); } }, 150);
});
})();
