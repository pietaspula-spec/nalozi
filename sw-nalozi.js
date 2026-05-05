// NaloziAdriatic Service Worker — v3.2
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // HTML uvijek s mreže, cache samo kao offline fallback
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
