import angular from 'angular';

import dataservice from './dataservice';

export default angular
    .module('app.core', [])
    .factory('dataservice', ['$http', '$q',dataservice])
    .name;
    
    
    