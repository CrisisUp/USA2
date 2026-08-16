const fs = require('fs');
const path = require('path');

function readPngDimensions(file) {
  const buffer = fs.readFileSync(file);
  if (buffer[0] !== 0x89 || buffer[1] !== 0x50 || buffer[2] !== 0x4E || buffer[3] !== 0x47) {
    return null;
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

function readJpegDimensions(file) {
  const buffer = fs.readFileSync(file);
  if (buffer[0] !== 0xFF || buffer[1] !== 0xD8) return null;
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xFF) break;
    const marker = buffer[offset + 1];
    if (marker >= 0xC0 && marker <= 0xCF && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    const length = buffer.readUInt16BE(offset + 2);
    offset += 2 + length;
  }
  return null;
}

function readSvgDimensions(file) {
  const content = fs.readFileSync(file, 'utf8');
  const widthMatch = content.match(/width\s*=\s*["'](\d+)/);
  const heightMatch = content.match(/height\s*=\s*["'](\d+)/);
  if (widthMatch && heightMatch) {
    return { width: parseInt(widthMatch[1]), height: parseInt(heightMatch[1]) };
  }
  const viewBoxMatch = content.match(/viewBox\s*=\s*["']\d+\s+\d+\s+(\d+)\s+(\d+)/);
  if (viewBoxMatch) {
    return { width: parseInt(viewBoxMatch[1]), height: parseInt(viewBoxMatch[2]) };
  }
  return null;
}

const data = require('./usa/js/data.js');

const results = [];

for (const stateKey in data.stateData) {
  const info = data.stateData[stateKey];
  for (let i = 0; i < info.media.length; i++) {
    const m = info.media[i];
    if (m.cover) {
      const file = require('path').resolve('usa', m.cover);
      if (require('fs').existsSync(file)) {
        try {
          let dims = null;
          const ext = require('path').extname(file).toLowerCase();
          if (ext === '.png') {
            dims = readPngDimensions(file);
          } else if (ext === '.jpg' || ext === '.jpeg') {
            dims = readJpegDimensions(file);
          } else if (ext === '.svg') {
            dims = readSvgDimensions(file);
          } else if (ext === '.webp' || ext === '.avif') {
            console.log('SKIP: ' + m.title + ' (webp/avif)');
            continue;
          }
          if (dims) {
            console.log(stateKey + ' | ' + m.title + ' | ' + dims.width + 'x' + dims.height + ' | ' + require('path').extname(file).slice(1) + ' | ' + (dims.width/dims.height).toFixed(2) + ':1');
          }
        } catch (e) {
          console.log('ERROR: ' + file + ' - ' + e.message);
        }
      }
    }
  }