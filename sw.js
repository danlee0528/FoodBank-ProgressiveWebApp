const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1'
const assets = [
    '/',
    '/pages/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/pages/fallback.html'
];

// install service worker
self.addEventListener('install', evt =>{
    // console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            return cache.addAll(assets);
        })
    );
});

// activate service worker
self.addEventListener('activate', evt =>{
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
                return keys.filter(key=>key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key));
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        }).catch(()=>{
            if(evt.request.url.indexOf('.html') > -1 ){
                return caches.match('/pages/fallback.html');
            }
        })
    );
});