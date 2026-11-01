const CACHE="chess-studio-v11";
self.addEventListener("install",e=>{self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
 const r=e.request;
 if(r.method!=="GET"||!/^https?:/.test(r.url)||r.headers.has("range"))return;
 e.respondWith(fetch(r).then(res=>{
  if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy)).catch(()=>{});}
  return res;
 }).catch(()=>caches.match(r).then(m=>m||(r.mode==="navigate"?caches.match("./"):undefined))));
});
