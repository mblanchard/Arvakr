import angular from 'angular';

import dataservice from './data.svc';
import cacheservice from './cache.svc';

export default angular
    .module('app.core', [])
    .factory('dataservice', ['$http', '$q',dataservice])
    .factory('cacheservice',cacheservice)
    .name;
    
    
    