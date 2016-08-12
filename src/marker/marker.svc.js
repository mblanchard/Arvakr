import weatherIcon from './../assets/images/rsz_slight_drizzle.png'
import inverterIcon from './../assets/images/power.svg'
import inverterWarningIcon from './../assets/images/power_warning.svg'
import inverterCriticalIcon from './../assets/images/power_critical.svg'
import solarIcon from './../assets/images/solar.svg'
import solarWarningIcon from './../assets/images/solar_warning.svg'
import solarCriticalIcon from './../assets/images/solar_critical.svg'
import solarNoDataIcon from './../assets/images/solar_no_data.svg'

import InitMockInverterSocket from './marker.data.js'

export default function MarkerService($q,$rootScope,$timeout,dataservice,authservice, gmapservice, geoservice) { 
  var markers = [];

  function updateMarkers() {
      createMarkersFromGeoServiceNodes();
      $rootScope.$broadcast('markers-updated');
  }
    $rootScope.$on('geospatial-loaded', function() { updateMarkers(); var socket = InitMockInverterSocket(dataservice,onInverterMessage);});
    $rootScope.$on('geospatial-updated', function() { updateMarkers(); });


  //TODO: Assigning icons to datasets is still handled client-side.  
  //Future-state, server passes URIs in response to initial "getDatasets" call
  function getIconFromDataset(datasetName,score) {
    if(datasetName.indexOf('Weather') > -1) return weatherIcon;
    if(datasetName.indexOf('Inverter') > -1) return inverterIcon;
    if(datasetName.indexOf('Solar') > -1)  {
      if(score == -1) {
        return solarNoDataIcon;
      }
      else if(score > 0.5) {
        return solarIcon;
      }
      else if(score > 0.25) {
        return solarWarningIcon;
      }
      else {
        return solarCriticalIcon;
      }


      
    }
  }
  
  function createMarkersFromGeoServiceNodes() {
    var datasets = geoservice.getActiveDatasets();
    markers = [];
    datasets.forEach(function(d){
      if(d.nodes != null && d.nodes.length > 0)
      markers =  markers.concat(d.nodes.map(function(m,i) {
        return  {  
          longitude: m.Longitude, latitude: m.Latitude, 
          coords:{'longitude': m.Longitude,'latitude': m.Latitude}, 
          key: d.Name + '_' + i, description: m.Name, icon: getIconFromDataset(d.Name,m.Score), dataset: d.Name
        } 
      }) )
    });
  }

  function getMarkers() {
    return markers;
  }
    
  function stripTime(date) {
    var normdate = new Date(date), y = normdate.getUTCFullYear(), m = normdate.getUTCMonth(), d = normdate.getUTCDate();
    return new Date(y, m, d);
  }
  
  function getMarkerData(key) {
    var args = key.split('_');
    return geoservice.getCached(args[0],args[1]);
  }

  function updateTimeSeriesIndicators(timeOffset) {
    var now = new Date();
    var then = new Date ( now );
    then.setHours ( now.getHours() + timeOffset);
    
    var dataset = geoservice.getDatasets()[1];
    var endpoint = dataset.TimeSeriesEndpoints[0];
    geoservice.updateCachedScores(dataset.Name,endpoint,(then-then%3600000)/1000,function(m) {return m.RealPower/3000;})
  }
   
  return {
    getMarkers: getMarkers,
    getMarkerData: getMarkerData,
    updateTimeSeriesIndicators: updateTimeSeriesIndicators
  }
};