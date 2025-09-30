const CACHE_NAME = 'diglearners-cache-v1'
const ASSETS = [ '/', '/index.html', '/src/styles.css' ]
self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)))
})
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request).catch(()=>caches.match('/')))
  )
})
