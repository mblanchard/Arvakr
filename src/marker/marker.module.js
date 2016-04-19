import angular from 'angular';

import markerservice from './marker.svc.js';

export default angular
    .module('app.marker',[])
    .factory('markerservice', ['$q','$rootScope', '$timeout','dataservice','cacheservice','authservice',markerservice])
    .name;