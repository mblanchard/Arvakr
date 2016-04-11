
export default function DataService($http, $q, busyservice) { 
    
  var endpoints = {}
  //var DEFAULT_API_BASE_URL = "http://localhost:8485/";
  var DEFAULT_API_BASE_URL = "http://alsvior.azurewebsites.net/";
  
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
  
  var request = function(key, data) {
    busyservice.startBusy(key + '...');
    var endpoint = endpoints[key];
    if(!endpoint) return defaultFailure();
    endpoint.config.data = data;   
    return $http(endpoint.config).then(endpoint.success).catch(endpoint.failure);
  }
  
  function defaultSuccess(response){busyservice.stopBusy();  return response.data;}
  function defaultFailure(e){busyservice.stopBusy(); /* LOG 'XHR Failed' */}
  
  return {
    endpoints: endpoints,
    addEndpoint: addEndpoint,
    request: request,
    generateUrl: generateUrl
  }
}
