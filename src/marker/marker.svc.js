import InitMarkerApi from './marker.data.js'
import MarkerCache from './marker.cache.js'
import weatherIcon from './../assets/images/rsz_slight_drizzle.png'
import inverterIcon from './../assets/images/power.svg'
import inverterWarningIcon from './../assets/images/power_warning.svg'
import inverterCriticalIcon from './../assets/images/power_critical.svg'

export default function MarkerService($q,$rootScope,$timeout,dataservice,cacheservice,authservice) { 
  var markerCache = new MarkerCache(cacheservice);
  
  function onInverterMessage(messageEvent){
    var args = messageEvent.data.split('_');
    if(markerCache == null || markerCache.inverterMarkers == null) return;
    
    var matchingIndex = markerCache.inverterMarkers.findIndex(
      function(inv){return inv.latitude == args[0] && inv.longitude == args[1]}
    );
    if(matchingIndex !== -1) {
      if(args[3] < 0.2 && args[3] > 0.1) { //warning
        markerCache.inverterMarkers[matchingIndex].icon = inverterWarningIcon;
      }
      else if(args[3] <= 0.1) { //warning
        markerCache.inverterMarkers[matchingIndex].icon = inverterCriticalIcon;
      }
      else {
        markerCache.inverterMarkers[matchingIndex].icon = inverterIcon;
      }
    }
  } 
  
  var markerApi = InitMarkerApi(dataservice, onInverterMessage);


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
          return  {  
                    longitude: m.Longitude, latitude: m.Latitude, 
                    coords:{'longitude': m.Longitude/1000000,'latitude': m.Latitude/1000000}, 
                    key: 'weather_' + i, description: 'Weather #' + i, icon: weatherIcon
                  } 
        });   
      }
    })
  }
  
  function initInverters() {
    if (markerCache.inverterMarkers !== null && markerCache.inverterMarkers !== undefined) return;
    
    return markerApi.getInverterMarkers().then(function(markers){
      if(markers) {
        markerCache.inverterMarkers = markers.map(function(m,i){
          return  {  
                    longitude: m.Longitude, latitude: m.Latitude, 
                    coords:{'longitude': m.Longitude/1000000,'latitude': m.Latitude/1000000}, 
                    key: 'inverter_' + i, description: 'Inverter #' + i, icon: inverterIcon
                  }          
        });   
      }
    })
  }
   
  function getWeatherMarkers() {
    if(authservice.isAuthenticated()) {
      return markerCache.weatherMarkers;
    }
  }
  
  function getInverterMarkers() {
    if(authservice.isAuthenticated()) {
      return markerCache.inverterMarkers;
    }
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
    if(!markerData) return $q.when('no marker data available');
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
      return getRecentDailyWeatherData(args[1]).then( function(data){ return data; }).catch(function(){return; });  
    }
    else if(args[0] == 'inverter') {
      return getRecentInverterData(args[1]).then( function(data) { return data; }).catch(function(){return; });
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