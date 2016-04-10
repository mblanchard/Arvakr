import AddMapEndpoints from './map.data.js';


export default function MapCtrl($scope, $q, $timeout, dataservice, gmapservice) {

  var mapEndpoints = AddMapEndpoints(dataservice); 
  const vm = this;
  
  activate();
 
  function activate() {
    var promises = [retrieveNodeData()];
    drawMap();
    return $q.all(promises).then(function () {
      //TODO: cache nodes
    });
  }
  
  $scope.markerSelected = function(marker) {
    vm.selectedMarker = marker;
  }
  vm.markerEvents = {
        click: function(marker, eventName, model) {
          console.log(marker);
        }
      }
  
  function retrieveNodeData() { 
    return mapEndpoints.getWeatherMarkers().then(function(markers){
      if(markers) {
        var nodes = [];
        for(var i = 0; i <markers.length; i++){
          nodes.push({
            'coords': {'longitude': markers[i].Longitude/1000000,'latitude': markers[i].Latitude/1000000},
            'key': i
          });
        }
        $timeout(function () {
          vm.mapNodes = gmapservice.createMarkers(nodes);
          return;
        });
      }

    })

  }
  
  
  
  function drawMap() {
    $timeout(function () {
      vm.map = gmapservice.map;
      vm.mapNodes = { length: 0 };
    });
  }
  
  return vm;
  
}