import template from './sidenav.tpl.html'

export default function sideNav() {
  
  SideNavController.$inject = ['$scope','$q','$timeout','dataservice','$mdSidenav','markerservice','gmapservice'];
  function SideNavController($scope, $q, $timeout, dataservice, $mdSidenav, markerservice,gmapservice) {
    const vm = this; 
    
    vm.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close()
          .then(function () {
          });
    }
    
    vm.selectMarker = function(marker) {
      console.log(marker);
      gmapservice.centerOn(marker.latitude/1000000,marker.longitude/1000000, 12);
    }
    
    
    function activate() {
      var promises = [markerservice.initialize()];
      return $q.all(promises).then(function () {
        vm.markers = markerservice.getInverterMarkers();
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