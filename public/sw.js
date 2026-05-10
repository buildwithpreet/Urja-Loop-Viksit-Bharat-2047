self.addEventListener("install", (event) => {
  console.log("UrjaLoop Service Worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("UrjaLoop Service Worker activated.");
});

self.addEventListener("fetch", (event) => {
  // Pass-through fetch to satisfy PWA installability requirements
  event.respondWith(fetch(event.request));
});
