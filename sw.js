const CACHE_NAME = 'fintrack-cache-v4';
const assets = [
  './',
  'index.html',
  'manifest.json',
  'logo-192x192.png',
  'logo-512x512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

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

self.addEventListener('fetch', e => {
  // Bypass cache untuk iframe Google Apps Script agar aplikasi selalu update
  if (e.request.url.includes('script.google.com')) {
    return;
  }
  
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
