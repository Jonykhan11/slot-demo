const CACHE_NAME = 'slot-demo-cache-v1';
const FILES_TO_CACHE = ['./','./index.html','./manifest.json','./sw.js','./icons/icon-192.png','./icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => { if (k!==CACHE_NAME) return caches.delete(k);} ))));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});