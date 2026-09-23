const CACHE = 'farroyo-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
// Red primero (para tener siempre la última versión); si no hay conexión, lo último que se cargó.
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method!=='GET' || !req.url.startsWith(self.location.origin)) return;
  e.respondWith(fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(cache => cache.put(req, c)); return res; }).catch(() => caches.match(req)));
});