import angular from 'angular';
import * as ngMap from 'angular-google-maps';
import * as ngLogger from 'angular-simple-logger';
import * as _ from 'lodash';

import gmapservice from './gmap.svc.js';

export default angular
    .module('app.gmap', ['uiGmapgoogle-maps'])
    .config(['uiGmapGoogleMapApiProvider',function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA_fK9gATPnmd31EOUqZGAq3zLlEDK0tEc',
        v: '3.22', //defaults to latest 3.X anyhow
        libraries: 'geometry,visualization'
    })}])
    .factory('gmapservice', ['dataservice', 'uiGmapGoogleMapApi','uiGmapObjectIterators',gmapservice])
    .name;
