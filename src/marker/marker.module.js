import angular from 'angular';

import markerservice from './marker.svc.js';

export default angular
    .module('app.marker',[])
    .factory('markerservice', ['$q','$rootScope', '$timeout','dataservice','authservice','gmapservice','geoservice',markerservice])
    .name;