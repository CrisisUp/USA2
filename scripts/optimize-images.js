// scripts/optimize-images.js — Otimização de imagens para WebP/AVIF
// Executa: node scripts/optimize-images.js

import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('usa/images');
const QUALITY = 80;
const WEBP_OPTIONS = { quality: QUALITY, effort: 6 };
const AVIF_OPTIONS = { quality: QUALITY, effort: 9 };

async function walkDir(dir, fileList = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath, fileList);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const dir = path.dirname(inputPath);

  const webpPath = path.join(dir, `${baseName}.webp`);
  const avifPath = path.join(dir, `${baseName}.avif`);

  try {
    const image = sharp(inputPath);

    // WebP
    await image.webp(WEBP_OPTIONS).toFile(webpPath);

    // AVIF
    await image.avif(AVIF_OPTIONS).toFile(avifPath);

    const originalSize = (await fs.stat(inputPath)).size;
    const webpSize = (await fs.stat(webpPath)).size;
    const avifSize = (await fs.stat(avifPath)).size;

    const webpSavings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    const avifSavings = ((originalSize - avifSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${path.relative(IMAGES_DIR, inputPath)}`);
    console.log(`  Original: ${(originalSize / 1024).toFixed(1)} KB`);
    console.log(`  WebP:     ${(webpSize / 1024).toFixed(1)} KB (-${webpSavings}%)`);
    console.log(`  AVIF:     ${(avifSize / 1024).toFixed(1)} KB (-${avifSavings}%)`);

    return { originalSize, webpSize, avifSize };
  } catch (error) {
    console.error(`✗ Erro ao processar ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🔍 Escaneando imagens em', IMAGES_DIR);
  const files = await walkDir(IMAGES_DIR);

  console.log(`\n📸 Encontradas ${files.length} imagens para otimizar\n`);

  let totalOriginal = 0;
  let totalWebP = 0;
  let totalAVIF = 0;
  let processed = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    if (result) {
      totalOriginal += result.originalSize;
      totalWebP += result.webpSize;
      totalAVIF += result.avifSize;
      processed++;
    }
  }

  console.log('\n📊 Resumo:');
  console.log(`  Processadas: ${processed}/${files.length}`);
  console.log(`  Total Original: ${(totalOriginal / 1024).toFixed(1)} KB`);
  console.log(`  Total WebP:     ${(totalWebP / 1024).toFixed(1)} KB (-${((totalOriginal - totalWebP) / totalOriginal * 100).toFixed(1)}%)`);
  console.log(`  Total AVIF:     ${(totalAVIF / 1024).toFixed(1)} KB (-${((totalOriginal - totalAVIF) / totalOriginal * 100).toFixed(1)}%)`);
}

main().catch(console.error);