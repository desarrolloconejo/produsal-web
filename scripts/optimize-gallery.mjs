// Optimiza las fotos de la galería y genera el manifiesto data/gallery.ts.
// Los originales se conservan en _originales/galeria (fuera de public y de git).
// Uso: node scripts/optimize-gallery.mjs
import sharp from "sharp";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public/images/galeria");
const BACKUP_DIR = path.join(ROOT, "_originales/galeria");
const MANIFEST = path.join(ROOT, "data/gallery.ts");

const MAX_SIDE = 2000;
const QUALITY = 82;

sharp.cache(false);

await fs.mkdir(BACKUP_DIR, { recursive: true });
await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

// 1. Respaldo: solo se copian los originales que aún no estén respaldados
const publicFiles = (await fs.readdir(PUBLIC_DIR)).filter((f) => f.endsWith(".webp"));
for (const file of publicFiles) {
  const backup = path.join(BACKUP_DIR, file);
  try {
    await fs.access(backup);
  } catch {
    await fs.copyFile(path.join(PUBLIC_DIR, file), backup);
  }
}

// 2. Optimización siempre desde el original respaldado
const sources = (await fs.readdir(BACKUP_DIR)).filter((f) => f.endsWith(".webp")).sort();
const entries = [];
const seen = new Set();
let before = 0;
let after = 0;

for (const file of sources) {
  const input = path.join(BACKUP_DIR, file);
  const output = path.join(PUBLIC_DIR, file);

  // Las fotos repetidas (mismo contenido con otro nombre) no se publican
  const hash = crypto.createHash("sha1").update(await fs.readFile(input)).digest("hex");
  if (seen.has(hash)) {
    await fs.rm(output, { force: true });
    console.log(`${file} duplicada, omitida`);
    continue;
  }
  seen.add(hash);
  before += (await fs.stat(input)).size;

  const buffer = await sharp(input)
    .rotate()
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer({ resolveWithObject: true });

  await fs.writeFile(output, buffer.data);
  after += buffer.info.size;
  entries.push({ src: `/images/galeria/${file}`, width: buffer.info.width, height: buffer.info.height });
  console.log(`${file} ${buffer.info.width}x${buffer.info.height} ${(buffer.info.size / 1024).toFixed(0)} KB`);
}

// 3. Manifiesto tipado para la página. Las fotos vienen agrupadas por sesión
// (atardeceres, envasado...), así que se intercalan para que el grid sea variado.
const STRIDE = 7;
const stride = entries.length % STRIDE === 0 ? STRIDE + 2 : STRIDE;
const ordered = entries.map((_, i) => entries[(i * stride) % entries.length]);
if (new Set(ordered).size !== entries.length) throw new Error("El intercalado repite fotos");

const manifest = `// Archivo generado por scripts/optimize-gallery.mjs. No editar a mano.
export interface GalleryImage {
  src: string;
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = ${JSON.stringify(ordered, null, 2)};
`;
await fs.writeFile(MANIFEST, manifest);

console.log(`\n${entries.length} fotos: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
