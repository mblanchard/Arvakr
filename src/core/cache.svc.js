
export default function CacheService() { 
  //Initialize Cache
  var cacheKeys = retrieveCacheFromLocalStorage('cacheKeys') || [];
  var persistedKeys = retrieveCacheFromLocalStorage('persistedKeys') || [];
  var cache = {};
  var CACHE_PREFIX = "APP_";
  
  
  (function() {
    persistedKeys.forEach(function(key){
      retrieveCacheFromLocalStorage(key);
    });
  })();
  //END: Initialize Cache

  //Local Storage
  function updateCacheInLocalStorage(key) {
    localStorage[CACHE_PREFIX + key] = JSON.stringify(cache[key]);
  }
  
  function retrieveCacheFromLocalStorage(key) {
    cache[key] = JSON.parse(localStorage[CACHE_PREFIX + key]);
    return cache[key];
  }
  //END: Local Storage
  
  //Methods
  function get (key) {
    return cache[key] || (cacheKeys.indexOf(key) > -1? {}: null);
  }
  
  function set (key, value) {
    cache[key] = value;
    if(persistedKeys.indexOf(key) > -1){
      updateCacheInLocalStorage(key);
    }
  }
  
  function addKey(key, isPersisted) {
    if (cacheKeys.indexOf(key) == -1) {
      cacheKeys.push(key);
      updateCacheInLocalStorage('cacheKeys');
      if(isPersisted) {
        persistedKeys.push(key);
        updateCacheInLocalStorage('persistedKeys');
      }
    }
  }
  //END: Methods

 
  return {
    get: get,
    set: set,
    addKey: addKey
  }
};

