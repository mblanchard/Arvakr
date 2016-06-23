import weatherIcon from './../assets/images/rsz_slight_drizzle.png'
import inverterIcon from './../assets/images/power.svg'
import inverterWarningIcon from './../assets/images/power_warning.svg'
import inverterCriticalIcon from './../assets/images/power_critical.svg'

export default function MarkerService($q,$rootScope,$timeout,dataservice,authservice, gmapservice, geoservice) { 
  var markers = [];
  
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


  function updateMarkers() {
      createMarkersFromGeoServiceNodes();
      $rootScope.$broadcast('markers-updated');
  }
    $rootScope.$on('geospatial-loaded', function() { updateMarkers(); });
    $rootScope.$on('geospatial-updated', function() { updateMarkers(); });


  //TODO: Assigning icons to datasets is still handled client-side.  
  //Future-state, server passes URIs in response to initial "getDatasets" call
  function getIconFromDataset(datasetName) {
    if(datasetName.indexOf('Weather') > -1) return weatherIcon;
    if(datasetName.indexOf('Inverter') > -1) return inverterIcon;
  }
  
  function createMarkersFromGeoServiceNodes() {
    var datasets = geoservice.getActiveDatasets();
    markers = [];
    datasets.forEach(function(d){
      if(d.nodes != null && d.nodes.length > 0)
      markers =  markers.concat(d.nodes.map(function(m,i) {
        return  {  
          longitude: m.Longitude, latitude: m.Latitude, 
          coords:{'longitude': m.Longitude/1000000,'latitude': m.Latitude/1000000}, 
          key: d.Name + '_' + i, description: m.Name, icon: getIconFromDataset(d.Name), dataset: d.Name
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
   
  return {
    getMarkers: getMarkers,
    getMarkerData: getMarkerData
  }
};