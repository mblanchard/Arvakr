import angular from 'angular';

import topNav from './topnav/topnav.ctrl.js';
import LoginCtrl from './login/login.ctrl.js';
import sideNav from './sidenav/sidenav.ctrl.js';


export default angular.module('app.layout',['app.core'])
    .controller('LoginCtrl', ['$scope','$q','$timeout','authservice','$mdDialog',LoginCtrl])
    .component('topNav',topNav())
    .component('sideNav',sideNav())
.name;
    