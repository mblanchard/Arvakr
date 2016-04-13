import InitMarkerApi from './marker.data.js'
import MarkerCache from './marker.cache.js'
//import InitMarkerHub from './marker.hub'

export default function MarkerService($q,$rootScope,$timeout,dataservice,cacheservice) { 
  var markerApi = InitMarkerApi(dataservice);
  var markerCache = new MarkerCache(cacheservice);
  //var markerHub = InitMarkerHub($rootScope, $timeout, Hub, markerCache);

  function initialize() {  
    var promises = [initWeather(),initInverters()];
    return $q.all(promises).then(function () {
      //do stuff
    });   
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
  
  function initInverters() {
    if (markerCache.inverterMarkers !== null && markerCache.inverterMarkers !== undefined) return;
    
    return markerApi.getInverterMarkers().then(function(markers){
      if(markers) {
        markerCache.inverterMarkers = markers.map(function(m,i){ 
          return { 'longitude': m.Longitude, 'latitude': m.Latitude, key: 'inverter_' + i} 
        });   
      }
    })
  }
  
  
  function getWeatherMarkers() {
    return markerCache.weatherMarkers;
  }
  
  function getInverterMarkers() {
    return markerCache.inverterMarkers;
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
  
  function getRecentInverterData(key) {
    var markerData = markerCache.inverterMarkers[key];
    if(!markerData) return;
    var lat = markerData.latitude; var lon = markerData.longitude;
    return markerApi.getRecentInverterData(lat,lon).then(function(data){
      return data;
    })
  }
  
  function getRecentDailyWeatherData(key) {
    
    var markerData = markerCache.weatherMarkers[key];
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
    var args = key.split('_');
    if(args[0] == 'weather') {
      return getRecentDailyWeatherData(args[1]).then( function(data){ return data; } );  
    }
    else if(args[0] == 'inverter') {
      return getRecentInverterData(args[1]).then( function(data) { return data; });
    }  
  }
   
  return {
    initialize: initialize,
    getWeatherMarkers: getWeatherMarkers,
    getInverterMarkers: getInverterMarkers,
    getDailyWeatherData: getDailyWeatherData,
    getRecentDailyWeatherData: getRecentDailyWeatherData,
    getMarkerData: getMarkerData
  }
};