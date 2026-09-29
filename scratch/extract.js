const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pptxPath = path.resolve('docs/Presentación Produsal 2026.pptx');
const zipPath = path.resolve('scratch/presentation.zip');
const dest = path.resolve('scratch/pptx');

fs.copyFileSync(pptxPath, zipPath);
console.log('Copied to zip.');

execSync(`powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${dest}' -Force"`);
console.log('Expanded successfully!');
