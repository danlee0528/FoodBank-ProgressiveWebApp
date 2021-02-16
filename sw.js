const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'site-dynamic-v3'
const NUM_CACHES_TO_KEEP = 15;
const assets = [
    '/pages/',
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

// cahce size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name,size));
            }
        });
    });
};


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
    if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
        //offince 
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone());
                        limitCacheSize(dynamicCacheName, NUM_CACHES_TO_KEEP);
                        return fetchRes;
                    })
                });
            }).catch(()=>{
                if(evt.request.url.indexOf('.html') > -1 ){
                    return caches.match('/pages/fallback.html');
                }
            })
        );
    }
});