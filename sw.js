// مختبر العلوم: يعمل دون إنترنت بعد أول فتح
const CACHE="mukhtabar-v2";
const PRE=["./", "index.html", "manifest.json", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/favicon.png", "img/c10a_1.jpg", "img/c10a_2.jpg", "img/c10a_3.jpg", "img/c10a_4.jpg", "img/c10a_5.jpg", "img/c10b_1.jpg", "img/c10b_2.jpg", "img/c10b_3.jpg", "img/c10b_4.jpg", "img/c10b_5.jpg", "img/c10b_6.jpg", "img/c1a_1.jpg", "img/c1a_2.jpg", "img/c1a_3.jpg", "img/c1a_4.jpg", "img/c1b_1.jpg", "img/c1b_2.jpg", "img/c1b_3.jpg", "img/c2a_1.jpg", "img/c2a_2.jpg", "img/c2a_3.jpg", "img/c2a_4.jpg", "img/c2a_5.jpg", "img/c2b_1.jpg", "img/c2b_2.jpg", "img/c2b_3.jpg", "img/c2b_4.jpg", "img/c3a_1.jpg", "img/c3a_2.jpg", "img/c3a_3.jpg", "img/c3b_1.jpg", "img/c3b_2.jpg", "img/c3b_3.jpg", "img/c3b_4.jpg", "img/c4a_1.jpg", "img/c4a_2.jpg", "img/c4a_3.jpg", "img/c4b_1.jpg", "img/c4b_2.jpg", "img/c5a_1.jpg", "img/c5a_2.jpg", "img/c5a_3.jpg", "img/c5a_4.jpg", "img/c5a_5.jpg", "img/c5b_1.jpg", "img/c5b_2.jpg", "img/c5b_3.jpg", "img/c5b_4.jpg", "img/c5b_5.jpg", "img/c6a_1.jpg", "img/c6a_2.jpg", "img/c6a_3.jpg", "img/c6b_1.jpg", "img/c6b_2.jpg", "img/c6b_3.jpg", "img/c6b_4.jpg", "img/c6b_5.jpg", "img/c7a_1.jpg", "img/c7a_2.jpg", "img/c7a_3.jpg", "img/c7b_1.jpg", "img/c7b_2.jpg", "img/c7b_3.jpg", "img/c7b_4.jpg", "img/c7b_5.jpg", "img/c8a_1.jpg", "img/c8a_2.jpg", "img/c8a_3.jpg", "img/c8a_4.jpg", "img/c8b_1.jpg", "img/c8b_2.jpg", "img/c8b_3.jpg", "img/c8c_1.jpg", "img/c8c_2.jpg", "img/c8c_3.jpg", "img/c8c_4.jpg", "img/c9a_1.jpg", "img/c9a_2.jpg", "img/c9a_3.jpg", "img/c9a_4.jpg", "img/c9a_5.jpg", "img/c9b_1.jpg", "img/c9b_2.jpg", "img/c9b_3.jpg", "img/c9b_4.jpg", "img/c9b_5.jpg", "img/c9b_6.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET")return;
  const url=new URL(r.url);
  if(r.mode==="navigate"){ // الصفحة: من الشبكة أولاً ليصل التحديث، ثم من التخزين
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put("./",cp));return res}).catch(()=>caches.match("./")));return;}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{
    if(url.origin===location.origin||url.hostname.endsWith("gstatic.com")||url.hostname.endsWith("googleapis.com")){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}
    return res;})));
});
