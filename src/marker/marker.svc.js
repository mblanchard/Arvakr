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
  
  function getDailyWeatherData(key) {
    var args = key.split('_');
    var markerData = markerCache.weatherMarkers[args[1]];
    if(!markerData) return null;
    var timestamp = Math.floor(stripTime(Date.now()).getTime()/1000);
    var lat = markerData.latitude; var lon = markerData.longitude;
    markerApi.getDailyWeatherData(lat,lon,timestamp).then(function(data){
      return data;
    })
  }
  
    function getRecentDailyWeatherData(key) {
    var args = key.split('_');
    var markerData = markerCache.weatherMarkers[args[1]];
    if(!markerData) return;
    var lat = markerData.latitude; var lon = markerData.longitude;
    return markerApi.getRecentDailyWeatherData(lat,lon).then(function(data){
      return data;
    })
  }
  
  function stripTime(date) {
    var normdate = new Date(date), y = normdate.getUTCFullYear(), m = normdate.getUTCMonth(), d = normdate.getUTCDate();
    return new Date(y, m, d);
  }
  
  function getMarkerData(key) {
    return getRecentDailyWeatherData(key).then(
      function(data){
        return data;
      }
    );
  }
   
  return {
    initialize: initialize,
    getWeatherMarkers: getWeatherMarkers,
    getDailyWeatherData: getDailyWeatherData,
    getRecentDailyWeatherData: getRecentDailyWeatherData,
    getMarkerData: getMarkerData
  }
};