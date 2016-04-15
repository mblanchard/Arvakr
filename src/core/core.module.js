import angular from 'angular';

import busyservice from './busy.svc';
import dataservice from './data.svc';
import cacheservice from './cache.svc';
import authservice from './auth/auth.svc';
import notificationservice from './notification/notification.svc';
import authcache from './auth/auth.cache';
import authinterceptor from './auth/authinterceptor';

export default angular
    .module('app.core', [])
    .factory('cacheservice',cacheservice)
    .factory('notificationservice', ['dataservice', notificationservice])
    .factory('busyservice',['$timeout',busyservice])
    .factory('dataservice', ['$http','$q','$timeout','busyservice',dataservice])
    .factory('authcache',['cacheservice',authcache])
    .factory('authservice', ['$q','$httpParamSerializer','dataservice','cacheservice','authcache',authservice])
    .factory('authinterceptor',['authcache',authinterceptor])
    .name;
    
    
    