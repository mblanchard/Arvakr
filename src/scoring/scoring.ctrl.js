export default function ScoringCtrl($scope, $q, $timeout, dataservice, geoservice) {
  const vm = this;  
  
  vm.datasets = geoservice.getDatasets();

  vm.buildQueryConfig = function(dataset) {
    if( dataset != null && dataset.activeTimeSeries != null && dataset.nodes.length > 0) {
      
      geoservice.getRecent(dataset.TimeSeriesEndpoints[dataset.activeTimeSeries], dataset.nodes[0].Id).then(function(response) {
        console.log(response);
      })
    }
  }

  vm.activeDataset = {};

  vm.editScoringFunction = function(dataset) {

  }


  
  $scope.$on('geospatial-loaded', function() {
    vm.datasets = geoservice.getDatasets();
  });
  


  return vm; 
}