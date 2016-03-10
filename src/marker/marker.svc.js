import InitMarkerApi from './marker.data.js'
import MarkerCache from './marker.cache.js'

export default function MarkerService($rootScope, Hub, $timeout,dataservice,cacheservice) { 
  var markerApi = InitMarkerApi(dataservice);
  var markerCache = new MarkerCache(cacheservice);
   
  return {
    
  }
};