// Service worker mínimo: siempre trae la versión nueva de la red; si no hay conexión, usa lo último guardado.
const CACHE='farroyo-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(k=>k.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));
});
