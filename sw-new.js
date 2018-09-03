// Workbox:: https://developers.google.com/web/tools/workbox/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

const staticAssets = [
    './',
    './style.css',
    './app.js',
    './fallback.json',
    './images/error_pages_offline.jpg'
];

workbox.precaching.precacheAndRoute(staticAssets);

workbox.routing.registerRoute(/.*\.(png|jpg|jpeg|gif)/,
    workbox.strategies.cacheFirst({
        cacheName: 'images-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
        ]
    })
);

const articleHandler = workbox.strategies.networkFirst({
    cacheName: 'news-articles-cache',
    plugins: [
        new workbox.expiration.Plugin({
            maxEntries: 50,
        })
    ]
});

workbox.routing.registerRoute(/^https:\/\/newsapi.org\/(.*)/, args => {
    return articleHandler.handle(args).then(response => {
        if (!response) {
            return caches.match('./fallback.json');
        }

        return response;
    });
});

