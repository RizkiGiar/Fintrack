const CACHE_NAME = 'fintrack-cache-v1';
const assets = [
  './',
  './index.html'
];

// Pasang Service Worker ke Browser
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// Aktifkan Service Worker
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Jalankan Fetch demi kelancaran Web App Apps Script
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
