import template from './topnav.tpl.html'
import loginTemplate from './../login/login.tpl.html'

export default function topNav() {
  
  TopNavController.$inject = ['$scope', '$q', '$mdDialog','$mdSidenav', '$interval', 'dataservice','authservice', 'notificationservice', 'gmapservice'];
  /* @ngInject */
  function TopNavController($scope, $q, $mdDialog,$mdSidenav, $interval, dataservice, authservice, notificationservice, gmapservice) {
    var vm = this;
    vm.isAuthenticated = authservice.isAuthenticated();
    vm.username = vm.isAuthenticated? authservice.getUser(): 'Guest';
    var interval = 1000;
    activate();
  
    function activate() {
      $interval(function () {
        updateNotifications();
      }, interval);
    }

    var updateNotifications = function() {
      var notificationData = notificationservice.getNotifications();
      vm.notifications = [];
      for (var i = 0; i < notificationData.length; i++) {
        var notification = notificationData[i];
        notification.fpLat = notification.lat/1000000;
        notification.fpLon = notification.lon/1000000
        vm.notifications.push(notification);
      }
    }
    
    vm.selectNotification = function(notification) {
      console.log(notification);
      gmapservice.centerOn(notification.fpLat,notification.fpLon, 12);
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
    
    vm.viewFilter = function() {
              $mdSidenav('right').open()
          .then(function () {
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
