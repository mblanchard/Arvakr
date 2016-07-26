import angular from 'angular';

import { routing } from './scoring.config.js';
import ScoringCtrl from './scoring.ctrl.js';

export default angular.module('app.scoring', [])
    .config(['$stateProvider',routing])
    .controller('ScoringCtrl', ['$scope','$q','$timeout','dataservice','geoservice',ScoringCtrl])
    .name;