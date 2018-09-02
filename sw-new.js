// Workbox:: https://developers.google.com/web/tools/workbox/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

const staticAssets = [
    './',
    './style.css',
    './app.js',
    './fallback.json',
    './images/error_pages_offline.jpg'
];

workbox.precaching.precache(staticAssets);
workbox.routing.registerRoute('https://newsapi.org/(.*)', workbox.strategies.networkFirst());
workbox.routing.registerRoute(/.*\.(png|jpg|jpeg|gif)/, workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  }));

