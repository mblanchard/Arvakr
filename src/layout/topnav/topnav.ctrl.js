import template from './topnav.tpl.html'
import loginTemplate from './../login/login.tpl.html'

export default function topNav() {
  
 
  
  TopNavController.$inject = ['$scope', '$q', '$mdDialog', 'dataservice','authservice'];
  /* @ngInject */
  function TopNavController($scope, $q, $mdDialog,dataservice,authservice) {
    var vm = this;
    vm.isAuthenticated = authservice.isAuthenticated();
    vm.username = vm.isAuthenticated? authservice.getUser(): 'Guest';
    activate();
  
    function activate() {
      var promises = [];
      return $q.all(promises).then(function () {
        //do stuff
      });
    }
    vm.goToFilter = function () {
      $state.go('filter');
    }
    
    vm.login = function () {
      $mdDialog.show({
        scope: $scope,
        preserveScope: true,
        template: loginTemplate,
        parent: angular.element(document.body),
        clickOutsideToClose: true
      });
    }
    
    vm.logout = function() {
      authservice.logout();
      vm.isAuthenticated = false;
      vm.username = '';
    }
    
    vm.openMenu = function(ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
  }
    

    
    return {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
          'navline': '='
    },
    template: template
  } 
}