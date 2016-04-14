
export default function DataService($http, $q, busyservice) { 
    
  var endpoints = {}
  var sockets = {}
  //var DEFAULT_API_BASE_URL = "http://localhost:8485/";
  var DEFAULT_API_BASE_URL = "https://alsvior.azurewebsites.net/";
  
  function generateUrl(relativeUrl) {
    return DEFAULT_API_BASE_URL + relativeUrl;
  }

  var addEndpoint = function(key, config, success, failure) {
    config.url = generateUrl(config.url);
    endpoints[key] = 
    {
      config: config,
      success: success || defaultSuccess,
      failure: failure || defaultFailure
    };
  }
  
  var addSocket = function(key, url, onmessage, onopen) {
    if(sockets[key] !== undefined) { return;}
    var newSocket = new WebSocket(generateUrl(url));
    newSocket.onopen = onopen;
    newSocket.onmessage = onmessage;
    sockets[key] = newSocket;
  }
  
  var request = function(key, data, url) {
    busyservice.startBusy(key + '...');
    
    var endpoint = endpoints[key];
    if(!endpoint) return defaultFailure();
    var config = { 'url': endpoint.config.url + (url != undefined? url:""), 'method':endpoint.config.method, 'data':data, 'headers':endpoint.config.headers}  
    return $http(config).then(endpoint.success).catch(endpoint.failure);
  }
  
  function defaultSuccess(response){busyservice.stopBusy();  return response.data;}
  function defaultFailure(e){busyservice.stopBusy(); /* LOG 'XHR Failed' */}
  
  return {
    endpoints: endpoints,
    addEndpoint: addEndpoint,
    request: request,
    generateUrl: generateUrl,
    addSocket: addSocket
  }
}
