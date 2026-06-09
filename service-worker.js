// Service worker LCHQ — cache des ressources pour fonctionnement hors-ligne
const CACHE = 'lchq-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './public/logos/logo2.png',
  './public/logos/logo-lchq.png',
  './public/logos/logo-banner.png',
  './public/logos/icon-192.png',
];

// Pré-cache à l'installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Stratégie : cache d'abord, réseau en repli (puis mise en cache)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          // Ne met en cache que les réponses valides de même origine
          if (response.ok && new URL(request.url).origin === self.location.origin) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
