export default function MarkerDetailCtrl($scope, $q, $timeout, authservice, $mdDialog) {

  const vm = this;
  vm.markerDetails = $scope.$parent.vm.markerDetails;
  
  vm.showChart = function(){
    $mdDialog.hide();
  }
  
  vm.closeDialog = function () {
    $mdDialog.cancel();
  }
  return vm;
}

