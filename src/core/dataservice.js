
export default function DataService($http, $q) { 
    
  var endpoints = {}
  var DEFAULT_API_BASE_URL = "http://localhost:48726";
  
  function generateUrl(relativeUrl) {
      return DEFAULT_API_BASE_URL + relativeUrl;
  }

  var addEndpoint = function(key, func) {
		endpoints[key] = func;
	}
  
  var request = function(key, args) {
    return endpoints[key]($http, $q, ...args);
  }
  
  return {
    endpoints: endpoints,
    addEndpoint: addEndpoint,
    request: request,
    generateUrl: generateUrl
  }
};
