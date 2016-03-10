import angular from 'angular';
import 'angular-signalr-hub';

//import markerservice from './marker.svc.js';

export default angular
    .module('app.marker', ['SignalR'])

    //.factory('markerservice', ['$rootScope','Hub', '$timeout','dataservice','cacheservice',markerservice])
    .name;