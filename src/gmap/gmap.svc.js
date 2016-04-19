import * as ngMap from 'angular-google-maps';


export default function GmapsService(dataservice, uiGmapGoogleMapApiProvider, uiGmapObjectIterators) { 
  //AddGMapEndpoints(dataservice);
  
  var map = { 
    showMarkers: true,
    doCluster: false,
    center: { latitude: 41.9, longitude: -87.8 }, 
    zoom: 11,
    control: {}
  };
  
  function centerOn(lat, lon, zoom) {
    map.center = { latitude: lat, longitude: lon};
    map.zoom = zoom;
  }

  return {
    map: map,
    centerOn: centerOn
  }
};