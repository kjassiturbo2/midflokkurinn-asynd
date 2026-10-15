// Horsing Around: Miðflokkurinn's retro variant.
// 1. <canvas class="dither"> inside a positioned Nótt element: a boiling dithered horse.
//    Optional data-horse (height × band), data-shift (visible share of width), data-top.
// 2. <canvas data-tolt> (optional data-progress=0..100, data-mode="live"): an Icelandic horse
//    tölting toward you in ASCII line art under a rising Eldur sun.
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

/* ---- The approaching horse: <canvas data-tolt data-progress="0..100" [data-mode="live"]> ---- */
// An Icelandic horse at the tölt, built from the brand horse (head, neck, mane, body, tail) with
// drawn legs, rendered as ASCII line art. It comes closer as progress rises, under a rising Eldur sun,
// and turns into the brand's rearing horse when the job is done.
const scene = document.querySelector('canvas[data-tolt]');
const D = Math.PI / 180, U = 168, TILT = -24 * D, BOX_W = 240, BOX_H = 180, SS = 4;
const RAMP = ' .:-=+*#%@';
// Tölt: four-beat lateral gait with high knee action. [phase, swing°, flex°]; swing + moves the hoof
// forward; fore flex folds the knee, hind flex folds the hock.
const FORE = [[0, 20, 0], [.2, 2, 0], [.4, -20, 8], [.55, -4, 70], [.7, 58, 108], [.86, 44, 40], [1, 20, 0]];
const HIND = [[0, 22, 10], [.25, 0, 12], [.48, -24, 4], [.62, -12, 42], [.8, 14, 58], [.92, 26, 24], [1, 22, 10]];

function keyframe(keys, p) {
  p = ((p % 1) + 1) % 1;
  let i = 0;
  while (keys[i + 1][0] < p) i++;
  const [p0, a0, b0] = keys[i], [p1, a1, b1] = keys[i + 1];
  const e = (1 - Math.cos((p - p0) / (p1 - p0) * Math.PI)) / 2;
  return [a0 + (a1 - a0) * e, b0 + (b1 - b0) * e];
}

let legless = null; // the brand horse with its raised legs cut away
function horseBody() {
  if (legless) return legless;
  const w = 609, h = 676;
  legless = document.createElement('canvas'); legless.width = w; legless.height = h;
  const b = legless.getContext('2d');
  b.drawImage(horse, 0, 0, w, h);
  b.globalCompositeOperation = 'destination-out';
  b.fillRect(0, .15 * h, .245 * w, .45 * h);
  b.beginPath();
  b.moveTo(.2 * w, .66 * h); b.lineTo(.47 * w, .62 * h); b.lineTo(.695 * w, .66 * h); b.lineTo(.695 * w, h); b.lineTo(.2 * w, h);
  b.fill();
  return legless;
}

// Tapered leg segments (angles absolute: 0 = straight down, + = forward), fetlock feathering, hoof.
// Returns the hoof position.
function leg(ctx, x, y, segments) {
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [angle, length, width] of segments) {
    const a = angle * D, nx = x - Math.sin(a) * length, ny = y + Math.cos(a) * length;
    ctx.lineWidth = width; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(nx, ny); ctx.stroke();
    x = nx; y = ny;
  }
  ctx.beginPath(); ctx.moveTo(x + 3, y - 9); ctx.lineTo(x + 7, y - 1); ctx.lineTo(x + 1, y - 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 4.5, y - 1); ctx.lineTo(x + 4.5, y - 1); ctx.lineTo(x + 5.5, y + 4); ctx.lineTo(x - 6, y + 4); ctx.closePath(); ctx.fill();
  return [x, y + 4];
}
const foreLeg = (ctx, p, [x, y]) => { const [s, f] = keyframe(FORE, p); return leg(ctx, x, y, [[s, 22, 13], [s - f, 19, 7.5], [s - f * .5 + 14, 7, 6]]); };
const hindLeg = (ctx, p, [x, y]) => { const [s, f] = keyframe(HIND, p); return leg(ctx, x, y, [[s - 34, 24, 13], [s + f * .9 - 2, 20, 7.5], [s + f * .5 + 16, 7, 6]]); };

// Draws the tölting horse into the 240×180 box (facing left) and returns its four hoof positions.
function drawTolt(ctx, phase) {
  const p = ((phase % 1) + 1) % 1, ox = 116, oy = 84 + 1.5 * Math.sin(p * Math.PI * 4);
  const at = (nx, ny) => {
    const x = (nx - .5) * HORSE_RATIO * U, y = (ny - .5) * U;
    return [ox + x * Math.cos(TILT) - y * Math.sin(TILT), oy + x * Math.sin(TILT) + y * Math.cos(TILT)];
  };
  ctx.fillStyle = ctx.strokeStyle = '#fff';
  ctx.globalAlpha = .55; // far-side legs first, dimmer
  const hooves = [hindLeg(ctx, p - .5, at(.62, .6)), foreLeg(ctx, p - .75, at(.29, .43))];
  ctx.globalAlpha = 1;
  ctx.save(); ctx.translate(ox, oy); ctx.rotate(TILT);
  ctx.drawImage(horseBody(), -.5 * HORSE_RATIO * U, -.5 * U, HORSE_RATIO * U, U);
  ctx.restore();
  hooves.push(hindLeg(ctx, p, at(.56, .6)), foreLeg(ctx, p - .25, at(.26, .44)));
  return hooves;
}
const drawRearing = ctx => { const bh = 176, bw = bh * HORSE_RATIO; ctx.drawImage(horse, 120 - bw / 2, 178 - bh, bw, bh); }; // fits the box

const H = { progress: 0, live: false, level: 0, phase: 0, scroll: 0, scale: .2, finishing: false, finishAt: 0, sparked: false };
const S_MIN = .25, S_MAX = .9;
const off = document.createElement('canvas'), octx = off.getContext('2d', { willReadFrequently: true });
const sky = Array.from({ length: 50 }, () => [Math.random(), Math.random() * .4, Math.random()]);
let hx, sw, sh, last = 0, running = false, dust = [], sparks = [], flips = new Float32Array(0), grounded = [];

function sizeScene() {
  const dpr = devicePixelRatio || 1;
  sw = scene.clientWidth; sh = scene.clientHeight;
  scene.width = sw * dpr; scene.height = sh * dpr;
  hx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Coverage (0..1) of each character cell for whatever draw() paints into the box.
function coverage(cols, rows, draw) {
  off.width = cols * SS; off.height = rows * SS;
  octx.setTransform(off.width / BOX_W, 0, 0, off.height / BOX_H, 0, 0);
  const result = draw(octx);
  const data = octx.getImageData(0, 0, off.width, off.height).data, cells = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    let sum = 0;
    for (let y = 0; y < SS; y++) for (let x = 0; x < SS; x++) sum += data[((r * SS + y) * off.width + c * SS + x) * 4 + 3];
    cells[r * cols + c] = sum / (SS * SS * 255);
  }
  return [cells, result];
}

function sceneFrame(t) {
  const dt = Math.min(.05, (t - last) / 1000 || 0);
  last = t;
  const since = H.finishing ? (t - H.finishAt) / 1000 : 0, slow = H.finishing ? Math.min(1, since / .9) : 0;
  if (H.live) {
    // Decorative speech-like swell; not the real audio level.
    const target = Math.max(0, Math.sin(t / 310) * .5 + Math.sin(t / 97) * .35 + Math.sin(t / 1700) * .4);
    H.level += (target - H.level) * .15;
  }
  const speed = (H.live ? 1 + H.level * .6 : 1) * (1 - slow * slow);
  H.phase += dt * 1.6 * speed; // strides per second
  H.scroll += dt * speed;
  const targetScale = H.live ? .5 + H.level * .03 : S_MIN + (S_MAX - S_MIN) * (H.finishing ? 1 : H.progress);
  H.scale = reduce ? targetScale : H.scale + (targetScale - H.scale) * Math.min(1, dt * (H.finishing ? 4 : 1.5));

  hx.clearRect(0, 0, sw, sh);
  const horizon = sh * .42;
  for (const [x, y, ph] of sky) {
    hx.fillStyle = `rgba(255,255,255,${.06 + .1 * Math.abs(Math.sin(t / 900 + ph * 20))})`;
    hx.fillRect(x * sw, y * sh, 1.2, 1.2);
  }
  // Rising sun in Eldur: a solid disc with a dithered glow and retro stripes; it rises with progress.
  const rise = H.live ? .6 : H.finishing ? 1 : H.progress;
  const sunR = sh * .3, sunX = sw * .5, sunY = horizon + sunR * (.95 - 1.15 * rise), px = 3;
  for (let y = Math.max(0, sunY - sunR * 1.25); y < horizon; y += px) {
    const stripe = (y - (sunY - sunR)) / (2 * sunR);
    if (stripe > .45 && ((y - sunY) / px | 0) % Math.max(2, Math.round(9 - stripe * 9)) === 0) continue;
    for (let x = sunX - sunR * 1.25; x < sunX + sunR * 1.25; x += px) {
      const d = Math.hypot(x - sunX, y - sunY) / sunR, v = d < 1 ? 1 : Math.max(0, .45 - (d - 1) * 1.8);
      if (v > BAYER[((x / px) & 3) + ((y / px) & 3) * 4]) { hx.fillStyle = d < 1 ? '#892222' : 'rgba(137,34,34,.55)'; hx.fillRect(x, y, px, px); }
    }
  }
  // Ground: perspective rows scrolling right, because the horse runs left.
  hx.font = '500 11px "IBM Plex Mono", monospace';
  hx.textAlign = 'center'; hx.textBaseline = 'middle';
  for (let k = 0; k < 12; k++) {
    const d = k / 11, y = horizon + (sh - horizon) * d * d + 4, gap = 7 + 34 * d * d;
    hx.fillStyle = `rgba(98,150,188,${.18 + .45 * d})`;
    const ch = d < .3 ? '.' : d < .7 ? '-' : '=';
    for (let x = -gap + (H.scroll * (20 + 260 * d * d)) % gap; x < sw + gap; x += gap) hx.fillText(ch, x, y);
  }

  // Nearer: bigger and lower on the ground. About 64 characters across the box.
  const near = Math.max(0, (H.scale - S_MIN) / (S_MAX - S_MIN));
  const bh = sh * H.scale, bw = bh * BOX_W / BOX_H, ground = horizon + (sh * .95 - horizon) * near;
  const hop = H.finishing ? .07 * Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, (since - 1.05) / .55)))) : 0;
  const cw = Math.max(3, bw / 64), chh = cw * 1.55, cols = Math.ceil(bw / cw), rows = Math.ceil(bh / chh);
  const left = Math.round((sw / 2 - bw / 2) / cw) * cw, top = Math.round((ground - bh * .98 - hop * bh) / chh) * chh;
  const toScreen = ([x, y]) => [left + x / BOX_W * cols * cw, top + y / BOX_H * rows * chh];

  const [tolt, hooves] = coverage(cols, rows, o => drawTolt(o, H.phase));
  let cells = tolt;
  if (H.finishing && since > .8) {
    // Each cell flips to the rearing brand horse at its own moment: a quick ASCII dissolve.
    if (flips.length !== cols * rows) flips = Float32Array.from({ length: cols * rows }, Math.random);
    const k = Math.min(1, (since - .8) / .35), [rearing] = coverage(cols, rows, drawRearing);
    cells = tolt.map((v, i) => (flips[i] < k ? rearing[i] : v));
  }

  // ASCII line art: each outline cell gets / \ | _ - from the edge direction; the inside stays open.
  const scramble = H.finishing && since > .8 && since < 1.2, glyphs = [];
  const cell = (c, r) => (c < 0 || r < 0 || c >= cols || r >= rows ? 0 : cells[r * cols + c]);
  hx.fillStyle = '#0f234c'; // the horse hides the sun and ground behind it
  cells.forEach((v, i) => { if (v > .12) hx.fillRect(left + (i % cols) * cw - .5, top + Math.floor(i / cols) * chh - .5, cw + 1, chh + 1); });
  cells.forEach((v, i) => {
    if (v < .12) return;
    const c = i % cols, r = (i - c) / cols;
    if (v >= .88 && cell(c - 1, r) >= .12 && cell(c + 1, r) >= .12 && cell(c, r - 1) >= .12 && cell(c, r + 1) >= .12) return;
    const gx = (cell(c + 1, r) - cell(c - 1, r)) / cw, gy = (cell(c, r + 1) - cell(c, r - 1)) / chh;
    const a = ((Math.atan2(gx, -gy) * 180 / Math.PI % 180) + 180) % 180; // edge angle, 0 = horizontal
    let g = a < 22.5 || a >= 157.5 ? (gy > 0 ? '-' : '_') : a < 67.5 ? '\\' : a < 112.5 ? '|' : '/';
    if (!gx && !gy) g = v > .5 ? ':' : '.';
    if (scramble && Math.random() < .3) g = RAMP[1 + Math.floor(Math.random() * 9)];
    glyphs.push([left + c * cw + cw / 2, top + r * chh + chh / 2, g]);
  });
  hx.font = `500 ${chh * .9}px "IBM Plex Mono", monospace`;
  for (const [dx, colour] of [[-1, 'rgba(219,183,101,.35)'], [1, 'rgba(98,150,188,.55)'], [0, `rgba(255,255,255,${.5 + .5 * near})`]]) {
    hx.fillStyle = colour;
    for (const [x, y, g] of glyphs) hx.fillText(g, x + dx, y);
  }

  // Dust: kicked up behind each hoof as it leaves the ground.
  const floor = Math.max(...hooves.map(([, y]) => y));
  hooves.forEach(([x, y], i) => {
    const down = y > floor - 3;
    if (grounded[i] && !down && speed > .3) {
      const [sx, sy] = toScreen([x, y]), s = Math.max(.4, near);
      for (let j = 0; j < 3; j++) dust.push({ x: sx + 2, y: sy - 1, vx: (30 + Math.random() * 50) * s, vy: -(10 + Math.random() * 22) * s, life: 1, size: s, color: Math.random() < .5 ? '#dbb765' : '#6296bc' });
    }
    grounded[i] = down;
  });
  if (H.finishing && since > 1.05 && !H.sparked) {
    H.sparked = true;
    for (let i = 0; i < 28; i++) {
      const a = -Math.PI * Math.random(), v = 60 + Math.random() * 130;
      sparks.push({ x: sw / 2, y: ground - bh * .08, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, size: 1, color: '#dbb765' });
    }
  }
  for (const list of [dust, sparks]) for (const p of list) {
    p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 60 * dt; p.life -= dt * (list === dust ? 1.6 : .8);
    hx.globalAlpha = Math.max(0, p.life);
    hx.fillStyle = p.color;
    hx.beginPath(); hx.arc(p.x, p.y, (1 + 2.2 * p.life) * p.size, 0, 7); hx.fill();
  }
  hx.globalAlpha = 1;
  dust = dust.filter(p => p.life > 0); sparks = sparks.filter(p => p.life > 0);

  if (running && !reduce) requestAnimationFrame(sceneFrame);
}

window.HorsingAround = {
  setProgress(value) { H.progress = value; if (reduce && running) requestAnimationFrame(sceneFrame); },
  // The horse slows, turns into the rearing brand horse, then done() is called.
  finish(done) {
    if (!running || reduce) return done();
    H.finishing = true; H.finishAt = performance.now();
    setTimeout(done, 2800);
  },
};

ready.then(() => document.fonts.ready).then(() => {
  initBands();
  if (!reduce) requestAnimationFrame(boil);
  if (scene) {
    hx = scene.getContext('2d');
    H.progress = +(scene.dataset.progress || 0) / 100;
    H.live = scene.dataset.mode === 'live';
    H.scale = H.live ? .5 : S_MIN + (S_MAX - S_MIN) * H.progress;
    running = true;
    sizeScene();
    requestAnimationFrame(sceneFrame);
  }
});
let resizeTimer;
addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { initBands(); if (running) { sizeScene(); if (reduce) requestAnimationFrame(sceneFrame); } }, 150);
});
})();
