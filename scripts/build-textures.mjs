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

// Montañas de sal punteadas para el header: el PNG del manual no cierra en los
// bordes, así que se une con su reflejo para obtener un tile continuo en horizontal.

const STIPPLE_SRC = path.join(ROOT, "public/images/textures/salt-stipple-mountains.png");
const STIPPLE_OUT = path.join(ROOT, "public/images/textures/salt-stipple-mountains-seamless.webp");
// Se recortan los márgenes transparentes y el degradado del borde izquierdo
// para que las montañas lleguen hasta la unión.
const trimmed = await sharp(STIPPLE_SRC).trim().toBuffer({ resolveWithObject: true });
const EDGE = 26;
const tileW = trimmed.info.width - EDGE * 2;
const tileH = trimmed.info.height;
const half = await sharp(trimmed.data).extract({ left: EDGE, top: 0, width: tileW, height: tileH }).toBuffer();
const mirrored = await sharp(half).flop().toBuffer();
const stipple = await sharp({
  create: { width: tileW * 2, height: tileH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    { input: half, left: 0, top: 0 },
    { input: mirrored, left: tileW, top: 0 },
  ])
  .webp({ lossless: true, effort: 6 })
  .toFile(STIPPLE_OUT);
console.log(`salt-stipple-mountains-seamless.webp ${stipple.width}x${stipple.height} ${(stipple.size / 1024).toFixed(0)} KB`);
