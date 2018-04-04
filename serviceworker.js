var staticCacheName = 'teachMyTot-static-v3';
var shapesJSON_path = '/public/jsons/shapes.json';
var colorsJSON_path = '/public/jsons/colors.json';

self.importScripts('node_modules/idb/lib/idb.js');

// A LIST OF LOCAL RESOURCES WE ALWAYS WANT TO BE CACHED IN THE BACKGROUND
const PRECACHE_URLS_BK = [
  'favicon.ico',
  'public/images/logos/logo.png',
  'public/images/logos/babies.png',
  'public/images/logos/heart.png',
  'public/images/menu.png',
  'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
  'https://fonts.googleapis.com/css?family=Itim',
  'http://fonts.googleapis.com/css?family=Itim',
  'https://fonts.gstatic.com/s/itim/v2/0nknC9ziJOYe8ANAluzaZwQ.woff',
  'http://fonts.gstatic.com/s/itim/v2/0nknC9ziJOYe8ANAluzaZwQ.woff',
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
  'public/images/shapes/gray_diamond.png'
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
  'node_modules/idb/lib/idb.js',
  'public/scripts/serviceworkerController.js',
  'public/scripts/createHeaderFooter.js',
  'public/scripts/showFlashcard.js',
  'public/stylesheets/index.css'
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
      loadDatabase().then(function(){
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
                if (requestUrl.pathname.startsWith(shapesJSON_path)) {
                  return serveObjects(request,'shapes');
                }   
                if (requestUrl.pathname.startsWith(colorsJSON_path)) {
                  return serveObjects(request,'colors');
                }   
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

function loadDatabase() {
  return idb.open('teachMyTot', 1, function(upgradeDb) {
      var shapeStore = upgradeDb.createObjectStore('shapes', {
        keyPath: 'id'
      });
      var colorStore = upgradeDb.createObjectStore('colors', {
        keyPath: 'id'
      });

      loadJSON(colorsJSON_path).then(colors => {
        storeObjects(colors,'colors');
      })

      loadJSON(shapesJSON_path).then(shapes => {
        storeObjects(shapes,'shapes');
      })
    
  });  
}

async function loadJSON(path){
  const response = await fetch(path);
  return await response.json();
}

function storeObjects(data, type){
  return idb.open('teachMyTot', 1).then(function(db) {
    var myObjects = db.transaction(type, 'readwrite');
    var myStore = myObjects.objectStore(type);
    Array.from(data).forEach(object =>{
      myStore.put(object);
    });
  })
}

function serveObjects(request, type){
  return idb.open('teachMyTot', 1).then(function(db) {
    
    var myObject = db.transaction(type, 'readonly');
    var store = myObject.objectStore(type);
    // RETURN THE ARRAY OF COLORS/SHAPES OBJECTS FROM INDEXEDDB
    return store.getAll();

  }).then(function(objects) {
    if (objects) {
      return new Response(JSON.stringify(objects));
    }  
    // OTHERWISE, FETCH FROM THE NETWORK, IF AVAILABLE
    return fetch(request);

  });
}  

