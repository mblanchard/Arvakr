import angular from 'angular';

import { routing } from './map.config.js';
import MapCtrl from './map.ctrl.js';
import MarkerDetailCtrl from './markerdetail/markerdetail.ctrl';
import timeSlider from './timeslider/timeslider.ctrl';

export default angular.module('app.map', ['uiGmapgoogle-maps','googlechart'])
    .config(['$stateProvider',routing])
    .controller('MapCtrl', ['$scope', '$q', '$timeout', 'dataservice','$mdDialog','gmapservice','markerservice',MapCtrl])
    .controller('MarkerDetailCtrl', ['$scope','$q','$timeout','authservice','$mdDialog','geoservice',MarkerDetailCtrl])
    .component('timeSlider',timeSlider())
    .name;