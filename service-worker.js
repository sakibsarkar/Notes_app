// Inside service-worker.js
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('my-cache-name').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/script.js',
                '/media.css'
                // Add more resources to cache as needed
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== 'my-cache-name') {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
