
export default function LoginCtrl($scope, $q, $timeout, authservice, $mdDialog) {

  const vm = this
  vm.username = ''
  vm.password = ''
  
  vm.login = function(){
    return authservice.login(vm.username,vm.password).then(function(result){
      if(result == true) {
        $scope.$parent.vm.isAuthenticated = true;
        $scope.$parent.vm.username = vm.username;
        $mdDialog.hide();
        document.location.reload();
      }       
      else {
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Unsuccessful Login')
            .content('Please try again')
            .ok('Ok')
        );
      }
    });
  }
  
  vm.closeDialog = function () {
    $mdDialog.cancel();
  }
  return vm;
}

