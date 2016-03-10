
export default function DataService($http, $q) { 
    
  var endpoints = {}
  var DEFAULT_API_BASE_URL = "http://localhost:48726";
  
  function generateUrl(relativeUrl) {
    return DEFAULT_API_BASE_URL + relativeUrl;
  }

  var addEndpoint = function(key, config, success, failure) {
    endpoints[key] = 
    {
      config: config,
      success: success || defaultSuccess,
      failure: failure || defaultFailure
    };
  }

  
  var request = function(key, data) {
    var endpoint = endpoints[key];
    if(!endpoint) return defaultFailure();
    endpoint.config.data = data;   
    return $http(endpoint.config).then(endpoint.success).catch(endpoint.failure);
  }
  
  function defaultSuccess(response){return response.data;}
  function defaultFailure(e){/* LOG 'XHR Failed' */}
  
  return {
    endpoints: endpoints,
    addEndpoint: addEndpoint,
    request: request,
    generateUrl: generateUrl
  }
}
