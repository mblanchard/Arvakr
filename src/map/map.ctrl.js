import markerDetailTemplate from './markerdetail/markerdetail.tpl.html'
import weatherIcon from './../assets/images/rsz_slight_drizzle.png'
import inverterIcon from './../assets/images/power.svg'

export default function MapCtrl($scope, $q, $timeout, dataservice,$mdDialog, gmapservice, markerservice, authservice) {

  const vm = this;
  $timeout(function () {
    vm.map = gmapservice.map;
    vm.mapNodes = { length: 0 }; 
    renderMarkers(); 
  });
  



  $scope.$on('markers-updated', function() {
    renderMarkers();
  });
  
  vm.markerEvents = {
    click: function(marker, eventName, model) {

      var details = markerservice.getMarkerData(marker.key);
      vm.selectedMarker = {'details':details, 'dataset':marker.model.dataset}
      $mdDialog.show({
        scope: $scope,
        preserveScope: true,
        template: markerDetailTemplate,
        parent: angular.element(document.body),
        clickOutsideToClose: true
      })
    }
  }
  
  function renderMarkers() {    
    $timeout(function () {
      vm.mapNodes = markerservice.getMarkers();
    });
  }
  
  return vm;
  
}