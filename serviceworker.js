var staticCacheName = 'teachMyTot-static-v2';

// A LIST OF LOCAL RESOURCES WE ALWAYS WANT TO BE CACHED IN THE BACKGROUND
const PRECACHE_URLS_BK = [
  'favicon.ico',
  'public/images/logos/logo.png',
  'public/images/logos/babies.png',
  'public/images/logos/heart.png',
  'public/images/menu.png',
  'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
  'https://fonts.googleapis.com/css?family=Itim',
  'https://fonts.gstatic.com/s/itim/v2/0nknC9ziJOYe8ANAluzaZwQ.woff',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js',
  'public/images/shapes/red_circle.png',
  'public/images/shapes/red_square.png',
  'public/images/shapes/red_triangle.png',
  'public/images/shapes/red_rectangle.png',
  'public/images/shapes/red_star.png',
  'public/images/shapes/red_oval.png',
  'public/images/shapes/red_diamond.png',
  'public/images/shapes/blue_circle.png',
  'public/images/shapes/blue_square.png',
  'public/images/shapes/blue_triangle.png',
  'public/images/shapes/blue_rectangle.png',
  'public/images/shapes/blue_star.png',
  'public/images/shapes/blue_oval.png',
  'public/images/shapes/blue_diamond.png',
  'public/images/shapes/green_circle.png',
  'public/images/shapes/green_square.png',
  'public/images/shapes/green_triangle.png',
  'public/images/shapes/green_rectangle.png',
  'public/images/shapes/green_star.png',
  'public/images/shapes/green_oval.png',
  'public/images/shapes/green_diamond.png',
  'public/images/shapes/black_circle.png',
  'public/images/shapes/black_square.png',
  'public/images/shapes/black_triangle.png',
  'public/images/shapes/black_rectangle.png',
  'public/images/shapes/black_star.png',
  'public/images/shapes/black_oval.png',
  'public/images/shapes/black_diamond.png',
  'public/images/shapes/white_circle.png',
  'public/images/shapes/white_square.png',
  'public/images/shapes/white_triangle.png',
  'public/images/shapes/white_rectangle.png',
  'public/images/shapes/white_star.png',
  'public/images/shapes/white_oval.png',
  'public/images/shapes/white_diamond.png',
  'public/images/shapes/orange_circle.png',
  'public/images/shapes/orange_square.png',
  'public/images/shapes/orange_triangle.png',
  'public/images/shapes/orange_rectangle.png',
  'public/images/shapes/orange_star.png',
  'public/images/shapes/orange_oval.png',
  'public/images/shapes/orange_diamond.png',
  'public/images/shapes/purple_circle.png',
  'public/images/shapes/purple_square.png',
  'public/images/shapes/purple_triangle.png',
  'public/images/shapes/purple_rectangle.png',
  'public/images/shapes/purple_star.png',
  'public/images/shapes/purple_oval.png',
  'public/images/shapes/purple_diamond.png',
  'public/images/shapes/yellow_circle.png',
  'public/images/shapes/yellow_square.png',
  'public/images/shapes/yellow_triangle.png',
  'public/images/shapes/yellow_rectangle.png',
  'public/images/shapes/yellow_star.png',
  'public/images/shapes/yellow_oval.png',
  'public/images/shapes/yellow_diamond.png',
  'public/images/shapes/gray_circle.png',
  'public/images/shapes/gray_square.png',
  'public/images/shapes/gray_triangle.png',
  'public/images/shapes/gray_rectangle.png',
  'public/images/shapes/gray_star.png',
  'public/images/shapes/gray_oval.png',
  'public/images/shapes/gray_diamond.png',
];

// A LIST OF LOCAL RESOURCES WE ALWAYS WANT TO BE CACHED
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/letters.html',
  '/numbers.html',
  '/addition.html',
  '/subtraction.html',
  '/iconcredits.html',
  'public/scripts/serviceworkerController.js',
  'public/scripts/createHeaderFooter.js',
  'public/scripts/showFlashcard.js',
  'public/jsons/shapes.json',
  'public/jsons/colors.json',
  'public/stylesheets/index.css',
];

// ADD THE RESOURCES TO THE CACHE WHEN THE SERVICE WORKER IS INSTALLED
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      // WE ARE CACHING SOME OF THE ITEMS HERE SO THEY'LL GET ADDED TO THE CACHE IN THEIR OWN GOOD TIME AND WILL NOT
      // DELAY THE INSTALLATION OF THE SERVICE WORKER.
        cache.addAll(PRECACHE_URLS_BK);
      // THE ITEMS BELOW ARE PART OF THE RETURN STATEMENT FOR THE PROMISE CREATED BY CACHES.OPEN. SINCE THE SERVICE WORKER
      // WILL NOT INSTALL UNTIL ALL THESE ITEMS ARE IN THE CACHE, WE TRY TO KEEP THEM TO A MINIMUM.
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

// THIS FIRES ONCE THE OLD SERVICE WORKER IS GONE, AND YOUR NEW SERVICE WORKER IS ABLE TO CONTROL THE CLIENT
// AT THIS POINT, WE CAN DELETE THE OLD CACHE
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('teachMyTot-') &&
                   cacheName != staticCacheName;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

// THIS INTERCEPTS THE REQUESTS MADE TO THE DOMAIN
self.addEventListener('fetch', function (event) {

    var request = event.request;

    var requestUrl = new URL(request.url);

  // FOR HTML REQUESTS
  if (request.headers.get('Accept').indexOf('text/html') !== -1) {
      event.respondWith(
          fetch(request)
              .then(function (response) {
                // CHECK THE CACHE FIRST  
                if (response) {
                    return response;
                }  
                // OTHERWISE, FETCH FROM THE NETWORK, IF AVAILABLE
                return fetch(request);
              })
              .catch(function () {
                  return caches.match(request)
                      .then(function (response) {
                          return response;
                      })
              })
      );
      return;
  }

  // FOR NON-HTML REQUESTS
  event.respondWith(
      caches.match(request)
          .then(function (response) {
                if (response) {
                    return response;
                }  
                // OTHERWISE, FETCH FROM THE NETWORK, IF AVAILABLE
                return fetch(request);
          })
    );
});

// THIS MESSAGE WILL CAUSE THE SERVICE WORKER TO KICK OUT THE CURRENT ACTIVE WORKER AND ACTIVATE ITSELF
self.addEventListener('message', function (event) {
    console.log('skipWaiting message is received ' + event.data.action)
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});