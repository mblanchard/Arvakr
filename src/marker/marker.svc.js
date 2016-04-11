import InitMarkerApi from './marker.data.js'
import MarkerCache from './marker.cache.js'

export default function MarkerService($rootScope, $timeout,dataservice,cacheservice) { 
  var markerApi = InitMarkerApi(dataservice);
  var markerCache = new MarkerCache(cacheservice);

  function initialize() {
    return initWeather();
  }
  
  
  function initWeather() {
    return markerApi.getWeatherMarkers().then(function(markers){
      if(markers) {
        markerCache.markers['weather'] = markers.map(function(m,i){ 
          return { 'longitude': m.Longitude, 'latitude': m.Latitude, key: 'weather_' + i} 
        });
      }
    })
  }
  
  function getMarkers(dataset) {
    return markerCache.markers['weather'];
  }
  
  function getMarkerData(key) {
    var args = key.split('_');
    var markerData = markerCache.markers[args[0]][args[1]];
    return markerData;
  }
   
  return {
    initialize: initialize,
    getMarkers: getMarkers,
    getMarkerData: getMarkerData
  }
};