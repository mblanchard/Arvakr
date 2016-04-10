export default function AuthCache(cacheservice) { 
  
    cacheservice.addKey('session', true);
    
    function setSession(session) {
     cacheservice.set('session',session);
    }
    
    function getSession() {
      return cacheservice.get('session');
    }
    return {
      setSession: setSession,
      getSession: getSession
    }
}