export default function DataService($http, $q, $timeout, busyservice) { 
    
  var endpoints = {}
  var sockets = {}
  //var DEFAULT_API_BASE_URL = "http://localhost:8485/";
  //var DEFAULT_WS_BASE_URL = "ws://localhost:8485/";
  var DEFAULT_API_BASE_URL = "https://alsvior.azurewebsites.net/";
  var DEFAULT_WS_BASE_URL = "wss://alsvior.azurewebsites.net/";
  
  function generateUrl(relativeUrl) {
    return DEFAULT_API_BASE_URL + relativeUrl;
  }
  
  function generateWSUrl(relativeUrl) {
    return DEFAULT_WS_BASE_URL + relativeUrl;
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
  
  var onSocketClose = function(key,url,onmessage, onopen, retries) {
      $timeout(function () {
        console.log("Attempting to reopen socket: " + key +"...");
        var socket = addSocket(key,url,onmessage, onopen)
      }, (Math.random() + 1) * 2000);
  }
  
  var addSocket = function(key, url, onmessage, onopen) {
    if(sockets[key] !== undefined && sockets.readyState <= 1) { return sockets[key];}
    var newSocket = new WebSocket(generateWSUrl(url));
    newSocket.onopen = onopen; 
    newSocket.onclose = function(){
      onSocketClose(key,url,onmessage,onopen,0);
    }
    newSocket.onmessage = onmessage;
    sockets[key] = newSocket;
    return sockets[key];
  }
  
  var request = function(key, data, url, params) {
    busyservice.startBusy(key + '...');
    
    var endpoint = endpoints[key];
    if(!endpoint) return defaultFailure();
    var config = endpoint.config;
    var config = { 'url': endpoint.config.url + (url != undefined? url:""), 
    'method':endpoint.config.method, 'data':data, 'headers':endpoint.config.headers,'params':params}  
    return $http(config).then(endpoint.success).catch(endpoint.failure);
  }
  
  function defaultSuccess(response){busyservice.stopBusy();  return response.data;}
  function defaultFailure(e){busyservice.stopBusy(); /* LOG 'XHR Failed' */}
  
  return {
    endpoints: endpoints,
    sockets: sockets,
    addEndpoint: addEndpoint,
    request: request,
    generateUrl: generateUrl,
    addSocket: addSocket
  }
}
