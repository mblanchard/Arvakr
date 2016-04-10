import angular from 'angular';

import topNav from './topnav/topnav.ctrl.js';
import LoginCtrl from './login/login.ctrl.js';


export default angular.module('app.layout',['app.core'])
    .controller('LoginCtrl', ['$scope','$q','$timeout','authservice','$mdDialog',LoginCtrl])
    .component('topNav',topNav())
.name;
    