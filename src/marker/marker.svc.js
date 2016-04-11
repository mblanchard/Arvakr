import InitMarkerApi from './marker.data.js'
import MarkerCache from './marker.cache.js'

export default function MarkerService($rootScope, $timeout,dataservice,cacheservice) { 
  var markerApi = InitMarkerApi(dataservice);
  var markerCache = new MarkerCache(cacheservice);

  function initialize() {
    return initWeather();
  }
  
  
  function initWeather() {
    if (markerCache.weatherMarkers !== null && markerCache.weatherMarkers !== undefined) return;
    
    return markerApi.getWeatherMarkers().then(function(markers){
      if(markers) {
        markerCache.weatherMarkers = markers.map(function(m,i){ 
          return { 'longitude': m.Longitude, 'latitude': m.Latitude, key: 'weather_' + i} 
        });   
      }
    })
  }
  
  function getWeatherMarkers() {
    return markerCache.weatherMarkers;
  }
  
  function getMarkerData(key) {
    var args = key.split('_');
    var markerData = markerCache.markers[args[0]][args[1]];
    return markerData;
  }
   
  return {
    initialize: initialize,
    getWeatherMarkers: getWeatherMarkers,
    getMarkerData: getMarkerData
  }
};