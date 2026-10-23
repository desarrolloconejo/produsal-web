// Genera la textura de ondas de sal como un tile vectorial grande y sin costuras
// (periódico en ambos ejes) para que se lea como una sola superficie.
// Uso: node scripts/build-textures.mjs
import fs from "node:fs/promises";
import sharp from "sharp";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/images/textures/salt-waves-seamless.svg");

const W = 2400;
const H = 1200;
const LINES = 80;
const SPACING = H / LINES;
const STEP = 4; // px entre puntos de cada línea
const LOOKAHEAD = 14; // líneas delanteras que pueden ocultar a una trasera
const NAVY = "#183c6b";
const SKY = "#85b2cf";

// PRNG con semilla fija: el resultado es reproducible
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(1989);

// Distancia más corta en un eje periódico
const wrapDelta = (d, period) => d - period * Math.round(d / period);

// Macizos de sal: campanas repartidas por el tile
const peaks = Array.from({ length: 26 }, () => ({
  cx: rand() * W,
  ci: rand() * LINES,
  sx: 70 + rand() * 150,
  si: 2.5 + rand() * 4.5,
  amp: 45 + rand() * 95,
}));

// Relieve fino: senos de frecuencia entera (cierran exacto en los bordes)
const ripples = Array.from({ length: 9 }, () => ({
  fx: 4 + Math.floor(rand() * 20),
  fi: 1 + Math.floor(rand() * 5),
  phase: rand() * Math.PI * 2,
  amp: 0.1 + rand() * 0.16,
}));

function height(x, i) {
  let h = 0;
  for (const p of peaks) {
    const dx = wrapDelta(x - p.cx, W);
    const di = wrapDelta(i - p.ci, LINES);
    h += p.amp * Math.exp(-(dx * dx) / (2 * p.sx * p.sx) - (di * di) / (2 * p.si * p.si));
  }
  let r = 1;
  for (const k of ripples) {
    r += k.amp * Math.sin((2 * Math.PI * k.fx * x) / W + (2 * Math.PI * k.fi * i) / LINES + k.phase);
  }
  return h * Math.max(0.15, r);
}

// Descarta los puntos que no aportan curvatura (tramos rectos)
function simplify(points) {
  const kept = [points[0]];
  for (let n = 1; n < points.length - 1; n++) {
    const [ax, ay] = kept[kept.length - 1];
    const [bx, by] = points[n];
    const [cx, cy] = points[n + 1];
    const expected = ay + ((cy - ay) * (bx - ax)) / (cx - ax);
    if (Math.abs(by - expected) > 0.2) kept.push(points[n]);
  }
  kept.push(points[points.length - 1]);
  return kept;
}

const cols = W / STEP + 1;
const heights = Array.from({ length: LINES }, (_, i) =>
  Float32Array.from({ length: cols }, (_, c) => height(c * STEP, i))
);

const paths = [];
for (let i = 0; i < LINES; i++) {
  const base = i * SPACING + SPACING / 2;
  const segments = [];
  let current = [];
  let top = base;

  for (let c = 0; c < cols; c++) {
    const y = base - heights[i][c];
    top = Math.min(top, y);
    // Oculta el tramo si alguna línea delantera sube por encima
    let hidden = false;
    for (let k = 1; k <= LOOKAHEAD; k++) {
      if (base + k * SPACING - heights[(i + k) % LINES][c] <= y) {
        hidden = true;
        break;
      }
    }
    if (hidden) {
      if (current.length > 1) segments.push(current);
      current = [];
    } else {
      current.push([c * STEP, y]);
    }
  }
  if (current.length > 1) segments.push(current);

  const d = segments
    .map((s) => `M${simplify(s).map(([x, y]) => `${x},${+y.toFixed(1)}`).join("L")}`)
    .join("");
  const stroke = i % 3 === 1 ? SKY : NAVY;
  paths.push(`<path d="${d}" stroke="${stroke}"/>`);
  // Los picos que cruzan el borde superior se repiten abajo para que el tile cierre
  if (top < 0) {
    paths.push(`<path d="${d}" stroke="${stroke}" transform="translate(0 ${H})"/>`);
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" stroke-width="1" stroke-linejoin="round" stroke-linecap="round">${paths.join("")}</svg>`;

await fs.writeFile(OUT, svg);
console.log(
  `salt-waves-seamless.svg ${(svg.length / 1024).toFixed(0)} KB (${(zlib.gzipSync(svg).length / 1024).toFixed(0)} KB gzip)`
);

// Pilas de sal punteadas para el header: conos de pendiente suave como los del
// patio de acopio (no picos de montaña). El tile cierra en los bordes porque
// cada pila se dibuja también desplazada un ancho a cada lado.

const STIPPLE_OUT = path.join(ROOT, "public/images/textures/salt-stipple-mountains-seamless.webp");
const SW = 1600;
const SH = 240;
const srand = mulberry32(1999);

// Cada pila: centro, altura y pendiente (~30-35°, ángulo de reposo de la sal)
const piles = [
  { cx: 120, h: 150, slope: 0.74 },
  { cx: 330, h: 205, slope: 0.72 },
  { cx: 560, h: 120, slope: 0.78 },
  { cx: 760, h: 215, slope: 0.7 },
  { cx: 1000, h: 165, slope: 0.75 },
  { cx: 1210, h: 110, slope: 0.8 },
  { cx: 1400, h: 195, slope: 0.72 },
].sort((p, q) => p.h - q.h); // las altas quedan detrás de las bajas

// Altura de una pila en x, con la cima redondeada
const ROUND = 14;
function pileHeight(pile, x) {
  const dx = wrapDelta(x - pile.cx, SW);
  return pile.h - (Math.hypot(dx * pile.slope, ROUND) - ROUND);
}

// Pila visible en un punto (la de delante tapa a las de atrás) y su lado
function pileAt(x, y) {
  const fromBottom = SH - y;
  for (let i = 0; i < piles.length; i++) {
    const pile = piles[i];
    if (fromBottom <= pileHeight(pile, x)) {
      return { pile, dx: wrapDelta(x - pile.cx, SW), depth: pileHeight(pile, x) - fromBottom };
    }
  }
  return null;
}

const dots = [];
const SAMPLES = 52000;
for (let i = 0; i < SAMPLES; i++) {
  const x = srand() * SW;
  const y = srand() * SH;
  const hit = pileAt(x, y);
  if (!hit) continue;
  // Cara izquierda iluminada (pocos puntos), cara derecha en sombra (más densa),
  // borde del perfil marcado y la base algo más cargada
  let density = hit.dx > 0 ? 0.42 : 0.07;
  if (hit.depth < 5) density = 0.9;
  density += (y / SH) * 0.12;
  if (srand() < density) dots.push([x, y]);
}

const circles = dots
  .map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.15"/>`)
  .join("");
const stippleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SW}" height="${SH}" fill="${NAVY}">${circles}</svg>`;
const stipple = await sharp(Buffer.from(stippleSvg)).webp({ lossless: true, effort: 6 }).toFile(STIPPLE_OUT);
console.log(`salt-stipple-mountains-seamless.webp ${stipple.width}x${stipple.height} ${(stipple.size / 1024).toFixed(0)} KB (${dots.length} puntos)`);
