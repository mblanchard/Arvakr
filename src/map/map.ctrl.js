import markerDetailTemplate from './markerdetail/markerdetail.tpl.html'
import sunImage from './../assets/images/happysun.gif'
import weatherIcon from './../assets/images/rsz_slight_drizzle.png'
import inverterIcon from './../assets/images/power.svg'

export default function MapCtrl($scope, $q, $timeout, dataservice,$mdDialog, gmapservice, markerservice, authservice) {

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
  
  function renderMarkers() { 
    vm.weatherNodes = markerservice.getWeatherMarkers();
    vm.inverterNodes = markerservice.getInverterMarkers();
    
    $timeout(function () {
      vm.mapNodes = vm.weatherNodes.concat(vm.inverterNodes);
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