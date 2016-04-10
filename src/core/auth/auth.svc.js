import InitAuthApi from './auth.data.js';
import AuthCache from './auth.cache.js';


export default function AuthService($q, $httpParamSerializer, dataservice, cacheservice,authcache) { 
   
  var authApi = InitAuthApi($httpParamSerializer,dataservice);
  var currentSession = authcache.getSession() || {};
  
  function isAuthenticated() {
    return (
      currentSession != null 
      && currentSession.accessToken != null 
      && currentSession.expires != null 
      && currentSession.expires > Date.now()
    )
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
        console.log("Retrieved Access Token: "+result.access_token);
        var expireTime = (result.expires_in * 1000) /*sec>>ms*/ + Date.now();
        currentSession = {"username": username, "accessToken": result.access_token, "expires": expireTime }   
        authcache.setSession(currentSession);
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
