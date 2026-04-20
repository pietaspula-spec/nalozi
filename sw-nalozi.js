// sw-nalozi.js — Adriatic Nalozi PWA Service Worker
// Strategija: Network First — admin uvijek treba svježe podatke
// Shell (HTML) se keširа samo kao fallback za offline prikaz

const CACHE = 'adriatic-nalozi-v2';
const SHELL = ['./index.html'];

// Install — keširaj shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL))
  );
  self.skipWaiting();
});

// Activate — očisti stare cacheove
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — Network First
self.addEventListener('fetch', e => {
  // Supabase API pozive nikad ne keširati
  if (e.request.url.includes('supabase.co')) return;

  // Za sve ostalo: pokušaj mrežu, fallback na cache
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Uspjelo — ažuriraj cache i vrati odgovor
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
