import AddGMapEndpoints from './gmap.data.js';
import * as ngMap from 'angular-google-maps';


export default function GmapsService(dataservice, uiGmapGoogleMapApiProvider) { 
  //AddGMapEndpoints(dataservice);
  
  var map = { 
    showMarkers: true,
    doCluster: true,
    center: { latitude: 41.9, longitude: -87.8 }, 
    zoom: 11,
  };
  
  
  function retrieveNodeData() { //TODO: Wire this up
    var nodes = [];
    var generatePair =function(val) {
      return {
        'latitude': Math.sin(val)*0.1 + map.center.latitude,
        'longitude': Math.cos(val)*0.1 + map.center.longitude
      };
    }
    for(var i = 0; i < 10; i++) {
      var coords = generatePair(i);
      console.log(coords);
      nodes.push({
        'coords': coords,
        'key': i
      });
    }
    return nodes;
  }

  var mapNodes = retrieveNodeData();

  return {
    map: map,
    mapNodes: mapNodes
  }
};