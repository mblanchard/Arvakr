export default function AuthCache(cacheservice) { 
  
    cacheservice.addKey('session', true);
    
    function setSession(session, cache_expires) {
     cacheservice.set('session',session, cache_expires);
    }
    
    function getSession() {
      return cacheservice.get('session');
    }
    return {
      setSession: setSession,
      getSession: getSession
    }
}