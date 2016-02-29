import angular from 'angular';
import * as ngMap from 'angular-google-maps';
import * as ngLogger from 'angular-simple-logger';
import * as _ from 'lodash';

import { routing } from './map.config.js';
import MapCtrl from './map.ctrl.js';

export default angular.module('app.map', ['uiGmapgoogle-maps'])
    .config(routing)
    .config(function(uiGmapGoogleMapApiProvider) {
       uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyA_fK9gATPnmd31EOUqZGAq3zLlEDK0tEc',
        v: '3.22', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    })})
    .controller('MapCtrl', ['$scope', '$q', '$timeout', 'dataservice', 'uiGmapGoogleMapApi',MapCtrl])
    .name;