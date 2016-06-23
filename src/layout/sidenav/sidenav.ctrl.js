import template from './sidenav.tpl.html'
import markerDetailTemplate from './../../map/markerdetail/markerdetail.tpl.html'

export default function sideNav() {
  
  SideNavController.$inject = ['$scope','$q','$rootScope','$timeout','dataservice','$mdSidenav','$mdDialog','gmapservice','geoservice'];
  function SideNavController($scope, $q, $rootScope, $timeout, dataservice, $mdSidenav, $mdDialog, gmapservice,geoservice) {
    const vm = this; 
    
    vm.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close().then(function () {
        
      });
    }

    $scope.$on('geospatial-loaded', function() {
      vm.datasets = geoservice.getDatasets();
    });
    
    vm.toggleDataset = function(id) {
      $rootScope.$broadcast('geospatial-updated');
    }

    vm.selectMarker = function(dataset,id) {
      
      $mdSidenav('right').close().then(function () {
        var details = geoservice.getCached(dataset,id);
        gmapservice.centerOn(details.Latitude/1000000,details.Longitude/1000000, 12);
        vm.selectedMarker = {'details':details, 'dataset':dataset}
        $mdDialog.show({
          scope: $scope,
          preserveScope: true,
          template: markerDetailTemplate,
          parent: angular.element(document.body),
          clickOutsideToClose: true
        })     
      });
    }
   
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