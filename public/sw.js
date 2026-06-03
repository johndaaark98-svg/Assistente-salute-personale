const CACHE_NAME = 'coach-v2';
const CACHE_URLS = ['/', '/index.html', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(CACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('/api/')) return;
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request).then((fr) => {
      if (fr.ok && e.request.method === 'GET') {
        const cloned = fr.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, cloned));
      }
      return fr;
    }).catch(() => caches.match('/')))
  );
});
