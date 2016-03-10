import angular from 'angular';

import { routing } from './map.config.js';
import MapCtrl from './map.ctrl.js';

export default angular.module('app.map', ['uiGmapgoogle-maps'])
    .config(['$stateProvider',routing])
    .controller('MapCtrl', ['$scope', '$q', '$timeout', 'dataservice','gmapservice',MapCtrl])
    .name;