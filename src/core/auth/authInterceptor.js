export default function AuthInterceptor(authcache) {
    var service = this;
    service.request = function(config) { 
        var session = authcache.getSession();
        if(session && session.accessToken) {
          config.headers.authorization = "Bearer " + session.accessToken;
        }    
        return config;
    }
    return service;
}
