self.addEventListener('install', (e) => {
  console.log('Service Worker Terpasang');
});
self.addEventListener('fetch', (e) => {
  // Biarkan fetch kosong untuk bypass syarat PWA offline Chrome
});
