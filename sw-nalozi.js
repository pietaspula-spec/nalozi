// NaloziAdriatic Service Worker — v3.1
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
