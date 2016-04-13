import template from './topnav.tpl.html'
import loginTemplate from './../login/login.tpl.html'

export default function topNav() {
  
  TopNavController.$inject = ['$scope', '$q', '$mdDialog', '$interval', 'dataservice','authservice', 'notificationservice'];
  /* @ngInject */
  function TopNavController($scope, $q, $mdDialog, $interval, dataservice, authservice, notificationservice) {
    var vm = this;
    vm.isAuthenticated = authservice.isAuthenticated();
    vm.username = vm.isAuthenticated? authservice.getUser(): 'Guest';
    var interval = 1000;
    activate();
  
    function activate() {
      var promises = [];
      return $q.all(promises).then(function () {
        $interval(function () {
          updateNotifications();
        }, interval);
      });
    }

    var updateNotifications = function() {
      const degreeSymbol = "\u00B0";

      var notificationData = notificationservice.getNotifications();
      vm.notifications = [];
      for (var i = 0; i < notificationData.length; i++) {
        var notification = notificationData[i];
        var latitude = notification.lat > 0 ? notification.lat/1000000 + degreeSymbol + " N" : -1*notification.lat/1000000 + degreeSymbol + " S";
        var longitude = notification.lon > 0 ? notification.lon/1000000 + degreeSymbol + " E" : -1*notification.lon/1000000 + degreeSymbol + " W";
        var time = (new Date(notification.time*1000)).toLocaleTimeString();
        vm.notifications.push("Error at (" + latitude + ", " + longitude + ") at " + time);
      }
    }

    vm.goToFilter = function () {
      $state.go('filter');
    }
    
    vm.refreshCache = function() {
      localStorage.clear();
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
