import angular from 'angular';

import geoservice from './geo.svc.js';

export default angular
    .module('app.geo',[])    
    .factory('geoservice', ['$q','$rootScope','$timeout','dataservice',geoservice])
    .name;