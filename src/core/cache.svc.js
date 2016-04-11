
export default function CacheService() { 
  //Initialize Cache
  var CACHE_PREFIX = "APP_";
  var cache = {};
  cache.cacheKeys = retrieveCacheFromLocalStorage('cacheKeys') || [];
  cache.persistedKeys = retrieveCacheFromLocalStorage('persistedKeys') || [];

  
  cache.persistedKeys.forEach(function(key){
    retrieveCacheFromLocalStorage(key);
  });
  
  //END: Initialize Cache

  //Local Storage
  function updateCacheInLocalStorage(key, cache_expires) {
    if(cache_expires) cache[key].cache_expires = cache_expires //set expiration if provided
    
    localStorage[CACHE_PREFIX + key] = JSON.stringify(cache[key]);
  }
  
  function retrieveCacheFromLocalStorage(key) {
    var cachedValue = localStorage[CACHE_PREFIX + key];
    var parsedValue = cachedValue===null || cachedValue===undefined? null: JSON.parse(cachedValue);
    if(parsedValue !== null && (parsedValue.cache_expires === undefined || parsedValue.cache_expires > Date.now()) ) { //validate either no expiration or not yet expired
      cache[key] = parsedValue;
    }
    else {
      cache[key] = null
    }
    return cache[key];
  }
  //END: Local Storage
  
  //Methods
  function get (key) {
    return cache[key] || (cache.persistedKeys.indexOf(key) > -1? cache[key]=retrieveCacheFromLocalStorage(key): null);
  }
  
  function set (key, value, expires) {
    cache[key] = value;
    if(cache.persistedKeys.indexOf(key) > -1){
      updateCacheInLocalStorage(key, expires);
    }
  }
  
  function addKey(key, isPersisted) {
    if (cache.cacheKeys.indexOf(key) == -1) {
      cache.cacheKeys.push(key);
      updateCacheInLocalStorage('cacheKeys');
      if(isPersisted) {
        cache.persistedKeys.push(key);
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

