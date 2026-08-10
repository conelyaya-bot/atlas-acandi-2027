/* Service Worker del Atlas Electoral de Acandí (PWA offline-first) */
const CACHE='acandi-atlas-v2';
const CORE=[
  './',
  './index.html',
  './manifest.webmanifest',
  './firebase-config.js',
  './assets/leaflet/leaflet.css',
  './assets/leaflet/leaflet.js',
  './assets/chart/chart.umd.min.js',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);

  // Teselas de mapas y CDNs (Leaflet/firebase): sirve cache y actualiza en segundo plano
  if(/arcgisonline|tile\.openstreetmap|googleapis|gstatic|firebase|mt1\.google|google\.com\/maps/.test(url.host)){
    e.respondWith(
      caches.match(req).then(cached=>{
        const network=fetch(req).then(res=>{
          if(res && res.ok){ const cl=res.clone(); caches.open(CACHE).then(c=>c.put(req,cl)); }
          return res;
        }).catch(()=>cached);
        return cached || network;
      })
    );
    return;
  }

  // App shell: red primero, cache como respaldo offline
  e.respondWith(
    fetch(req).then(res=>{
      const cl=res.clone();
      caches.open(CACHE).then(c=>c.put(req,cl));
      return res;
    }).catch(()=>caches.match(req).then(c=>c || caches.match('./index.html')))
  );
});
