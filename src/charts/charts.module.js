import angular from 'angular';

import { routing } from './charts.config.js';
import ChartsCtrl from './charts.ctrl.js';
import chartTile from './chartTile/chartTile.ctrl.js';

export default angular.module('app.charts', ['googlechart'])
    .config(['$stateProvider',routing])
    .controller('ChartsCtrl', ['$scope','$q','$timeout','dataservice',ChartsCtrl])
    .component('chartTile',chartTile())
    .name;