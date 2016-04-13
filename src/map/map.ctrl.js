import AddMapEndpoints from './map.data.js';
import markerDetailTemplate from './markerdetail/markerdetail.tpl.html'
import sunImage from './../assets/images/happysun.gif'
import flashIcon from './../assets/images/flash_icon.png'
import cloudIcon from './../assets/images/ic_filter_drama_black_48px.svg'

export default function MapCtrl($scope, $q, $timeout, dataservice,$mdDialog, gmapservice, markerservice) {

  const vm = this;
  
  activate();
 
  function activate() {
    var promises = [markerservice.initialize()];
    drawMap();
    return $q.all(promises).then(function () {
      renderMarkers()
    });
  }
  
  vm.markerEvents = {
    click: function(marker, eventName, model) {
      vm.selectedMarker = marker;
      retrieveMarkerData(marker.key).then(function(details) {
        vm.markerDetails = details;
        $mdDialog.show({
          scope: $scope,
          preserveScope: true,
          template: markerDetailTemplate,
          parent: angular.element(document.body),
          clickOutsideToClose: true
        })
      })
    }
  }
    
  vm.login = function () {
      
  }
  
  function renderMarkers() { 
    var nodes = []
    //weather
    var markers = markerservice.getWeatherMarkers();

    if(markers && markers.length !== undefined) {      
      for(var i = 0; i <markers.length; i++){
        nodes.push({
          'coords': {'longitude': markers[i].longitude/1000000,'latitude': markers[i].latitude/1000000}, //Fixed-point >> floating-point
          'key': markers[i].key,
          'icon': cloudIcon
        });
      }     
    }
    
    //inverters
    var inverterMarkers = markerservice.getInverterMarkers();
    if(inverterMarkers && inverterMarkers.length !== undefined) {     
      for(var i = 0; i <inverterMarkers.length; i++){
        nodes.push({
          'coords': {'longitude': inverterMarkers[i].longitude/1000000,'latitude': inverterMarkers[i].latitude/1000000}, //Fixed-point >> floating-point
          'key': inverterMarkers[i].key,
          'icon': flashIcon
        });
      }     
    }
    $timeout(function () {
      vm.mapNodes = nodes;
      return;
    });
  }
   
  function drawMap() {
    $timeout(function () {
      vm.map = gmapservice.map;
      vm.mapNodes = { length: 0 };
    });
  }

  
  function retrieveMarkerData(key) {
    return markerservice.getMarkerData(key).then(
      function(data){return data;}
    );
  }
  
  return vm;
  
}