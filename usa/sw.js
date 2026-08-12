// sw.js - Service Worker: cache de assets e suporte offline
// O site é 100% estático, então todos os recursos podem ser cacheados na instalação.

const CACHE_NAME = 'usa-map-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/base.css',
  './css/layout.css',
  './css/map.css',
  './css/components.css',
  './css/animations.css',
  './css/responsive.css',
  './js/data.js',
  './js/main.js',
  './js/map-interactions.js',
  './js/search.js',
  './js/display.js',
  './js/utils.js',
  './manifest.webmanifest',
  './usa-map.svg',
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