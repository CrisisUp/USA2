// scripts/generate-sw-cache.js — Gera lista ASSETS_TO_CACHE para sw.js
// Executa: node scripts/generate-sw-cache.js

import { promises as fs } from 'node:fs';
import path from 'node:path';

const USA_DIR = path.resolve('usa');
const SW_PATH = path.resolve('usa/sw.js');

async function walkDir(dir, fileList = [], baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Ignora a pasta tools/ — contém scripts one-shot de desenvolvimento que
      // não fazem parte do site e são excluídos do versionamento (.gitignore).
      // Incluí-la no cache faria o service worker falhar em produção.
      if (entry.name === 'tools') continue;
      await walkDir(fullPath, fileList, baseDir);
    } else {
      // Ignora arquivos ocultos e sourcemaps
      if (entry.name.startsWith('.') || entry.name.endsWith('.map')) continue;

      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      fileList.push(`'./${relativePath}'`);
    }
  }
  return fileList;
}

function generateCacheList(assets) {
  // Ordena: HTML primeiro, depois CSS, JS, manifest, SVG, imagens
  const order = [
    '/index.html',
    '/manifest.webmanifest',
    '/usa-map.svg',
    '/css/',
    '/js/',
    '/images/',
    '/icons/',
  ];

  return assets.sort((a, b) => {
    const pathA = a.replace(/'/g, '');
    const pathB = b.replace(/'/g, '');

    for (const prefix of order) {
      const aMatches = pathA.includes(prefix);
      const bMatches = pathB.includes(prefix);
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
    }
    return pathA.localeCompare(pathB);
  });
}

function updateSWFile(cacheList) {
  const cacheArray = generateCacheList(cacheList).join(',\n  ');

  return `// sw.js - Service Worker: cache de assets e suporte offline
// O site é 100% estático, então todos os recursos podem ser cacheados na instalação.
// ⚠️ ESTE ARQUIVO É GERADO AUTOMATICAMENTE — NÃO EDITE MANUALMENTE
// Execute: npm run build:sw (ou node scripts/generate-sw-cache.js)

const CACHE_NAME = 'usa-map-v1';
const ASSETS_TO_CACHE = [
  ${cacheArray}
];

// Instalação: prepara o cache com os recursos essenciais.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Ativação: limpa caches antigos de versões anteriores.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: prioriza o cache (offline-first), com fallback para a rede.
self.addEventListener('fetch', (event) => {
  // Não intercepta requests para domínios externos (ex.: placeholder via.placeholder.com)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(event.request)
        .then((response) => {
          // Guarda no cache apenas respostas válidas de GET
          if (response && response.ok && event.request.method === 'GET') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline e sem cache: cai para o index.html (suporte a SPA simples)
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
`;
}

async function main() {
  console.log('🔍 Escaneando assets em', USA_DIR);
  const assets = await walkDir(USA_DIR);

  console.log(`📦 Encontrados ${assets.length} assets`);

  const swContent = updateSWFile(assets);
  await fs.writeFile(SW_PATH, swContent);

  console.log('✅ sw.js atualizado em', SW_PATH);
  console.log(`   Cache entries: ${assets.length}`);
}

main().catch(console.error);