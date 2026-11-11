// sw.js 鈥?绂荤嚎缂撳瓨锛堥鐩簲鐢ㄩ浂澶栭儴渚濊禆锛岀紦瀛橀椤典笌鍥炬爣鍗冲彲鍏ㄧ绾匡級
const CACHE = 'wrh5-v12';
const ASSETS = ['./', './index.html', './data.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 缂撳瓨浼樺厛锛屽洖婧愬悗鏇存柊缂撳瓨锛堥鐩暟鎹湰鍦版墦鍖咃紝鏇存柊闈犵増鏈彿鍗嘋ACHE锛?self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      const fetched = fetch(e.request).then(res => {
        if (res && res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || fetched;
    })
  );
});
