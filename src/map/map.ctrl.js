import MapService from './map.svc.js';


export default function MapCtrl($scope, $q, $timeout, dataservice, uiGmapGoogleMapApiProvider) {

  MapService(dataservice); 
  const vm = this;
  vm.map = { 
    showMarkers: false,
    doCluster: true,
    center: { latitude: 41.9, longitude: -87.8 }, 
    zoom: 11 
    };
  
  activate();
  vm.mapNodes = retrieveNodeData();
  vm.map.showMarkers = true;
  function activate() {
    
    var promises = [];
    return $q.all(promises).then(function () {

    });
  }
  
   function retrieveNodeData() { //TODO: Wire this up
    var nodes = [];
    var generatePair =function(val) {
      return {
        'latitude': Math.sin(val)*0.1 + vm.map.center.latitude,
        'longitude': Math.cos(val)*0.1 + vm.map.center.longitude
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
  
  
  
}