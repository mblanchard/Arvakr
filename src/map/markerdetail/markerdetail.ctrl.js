
export default function MarkerDetailCtrl($scope, $q, $timeout, authservice, mapservice, $mdDialog) {

  const vm = this
  vm.username = ''
  vm.password = ''
  
  vm.login = function(){
    return authservice.login(vm.username,vm.password).then(function(result){
      if(result == true) {
        $scope.$parent.vm.isAuthenticated = true;
        $scope.$parent.vm.username = vm.username;
        $mdDialog.hide();
      }       
    });
  }
  
  vm.closeDialog = function () {
    $mdDialog.cancel();
  }
  return vm;
}

