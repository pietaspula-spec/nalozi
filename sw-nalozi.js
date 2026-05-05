// NaloziAdriatic Service Worker — v3.2
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
