import InitAuthApi from './auth.data.js';
import AuthCache from './auth.cache.js';

export default function AuthService($q, $httpParamSerializer, dataservice, cacheservice,authcache) {   
  var authApi = InitAuthApi($httpParamSerializer,dataservice);
  var currentSession = authcache.getSession() || {};
  
  function isAuthenticated() {
    return (
      currentSession != null 
      && currentSession.accessToken != null
    )
  }
  
  var processRequestQueue = function() {
    var length = authcache.authenticatedRequestQueue.length;
    if(length > 0)
    $q.all(authcache.authenticatedRequestQueue).then(function() {
      
    })
    .finally(function(){ authcache.authenticatedRequestQueue.slice(0,length); }) //remove all queued requests as of processing start
    
    if(authcache.authenticatedRequestQueue.length > 0) { //were new pending authenticated requests queued up after processing/before 
      processRequestQueue();
    }
  }
  
  function getCachedToken() {
    return isAuthenticated()? currentSession.accessToken: null;
  }

  function getUser() {
    return isAuthenticated()? currentSession.username: null;
  }
  
  function register(username, password, confirmPassword) {
    authApi.register(username, password, confirmPassword);
  }
  
  function logout() {
    authcache.setSession({});
  }
  
  function login(username, password) {
    return authApi.requestToken(username, password).then(function(result) {
      if(result && result.access_token) {
        var expireTime = (result.expires_in * 1000) /*sec>>ms*/ + Date.now();
        currentSession = {"username": username, "accessToken": result.access_token}   
        authcache.setSession(currentSession, expireTime);  
        processRequestQueue();      
        return true; 
      }
      return false;
    });  
  }
  
  return {
    isAuthenticated: isAuthenticated,
    getCachedToken: getCachedToken,
    getUser: getUser,
    register: register,
    login: login,
    logout: logout
  }
}
