export default function ScoringCtrl($scope, $q, $timeout, dataservice, geoservice) {
  const vm = this;  
  
  vm.datasets = geoservice.getDatasets();
  
  $scope.$on('geospatial-loaded', function() {
    vm.datasets = geoservice.getDatasets();
  });
  

  return vm; 
}