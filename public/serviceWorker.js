const staticDevCoffee = "admin-panel-ui-cache-v1";
const assets = [];
// window.request = [];
self.addEventListener("install", function (installEvent) {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(function (cache) {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", function (fetchEvent) {
  // Let the browser do its default thing
  // for non-GET requests.
  if (fetchEvent.request.method != "GET") return;
  // console.log(fetchEvent);
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(function (res) {
      return res || fetch(fetchEvent.request);
    })
  );
});

function isResponseSoreinCatch(response) {
  // Check if we received a valid response
  if (!response || response.status !== 200 || response.type !== "basic") {
    return response;
  }
  var responseToCache = response.clone();

  caches.open(staticDevCoffee).then(function (cache) {
    cache.put(fetchEvent.request, responseToCache);
  });

  return response;
}
