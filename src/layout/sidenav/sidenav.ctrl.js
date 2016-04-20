import template from './sidenav.tpl.html'
import markerDetailTemplate from './../../map/markerdetail/markerdetail.tpl.html'

export default function sideNav() {
  
  SideNavController.$inject = ['$scope','$q','$timeout','dataservice','$mdSidenav','$mdDialog','markerservice','gmapservice'];
  function SideNavController($scope, $q, $timeout, dataservice, $mdSidenav, $mdDialog, markerservice,gmapservice) {
    const vm = this; 
    
    vm.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close().then(function () {
        
      });
    }
    
    vm.selectMarker = function(marker) {
      console.log(marker);
      gmapservice.centerOn(marker.latitude/1000000,marker.longitude/1000000, 12);
      $mdSidenav('right').close().then(function () {
        
        markerservice.getMarkerData(marker.key).then(function(details) {
          vm.markerDetails = details;
          $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            template: markerDetailTemplate,
            parent: angular.element(document.body),
            clickOutsideToClose: true
          })
        })
      });
    }
       
    function activate() {
      var promises = [markerservice.initialize()];
      return $q.all(promises).then(function () {
        vm.datasets = [];
        vm.datasets.push( { label: 'Weather', markers:markerservice.getWeatherMarkers() })
        vm.datasets.push( { label: 'Inverters', markers:markerservice.getInverterMarkers() })
      });
    }
    
    activate();   
    return vm;
  }
  
  return {
    bindToController: true,
    controller: SideNavController,
    controllerAs: 'vm',
    restrict: 'EA',
    scope: {
      'navline': '='
    },
    template: template
  } 
}