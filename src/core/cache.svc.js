
export default function CacheService() { 
  //Initialize Cache
  var cache = {};
  var cacheKeys = retrieveCacheFromLocalStorage('cacheKeys') || [];
  var persistedKeys = retrieveCacheFromLocalStorage('persistedKeys') || [];
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
    var cachedValue = localStorage[CACHE_PREFIX + key];
    cache[key] = cachedValue===null || cachedValue===undefined? null: JSON.parse(cachedValue);
    return cache[key];
  }
  //END: Local Storage
  
  //Methods
  function get (key) {
    return cache[key] || (persistedKeys.indexOf(key) > -1? cache[key]=retrieveCacheFromLocalStorage(key): null); //Review: Is distinguishing cache miss w/ key defined vs. undef valuable?
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

