//Styles
import 'angular-material/angular-material.min.css';
import './assets/style/app.css';
import './assets/style/spinner.css';
import './assets/style/topnav.css';
import './assets/style/charts.css'

//External Dependencies
import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngAnimate from 'angular-animate/angular-animate.min.js';
import ngAria from 'angular-aria';

import ngMaterial from 'angular-material'
import 'angular-google-chart'

//Config
import { routing, routingEventsLogger, theming,addInterceptors } from './app.config';

//Components
import core from './core/core.module';
import gmap from './gmap/gmap.module';
import map from './map/map.module';
import charts from './charts/charts.module';
import marker from'./marker/marker.module';
import layout from './layout/layout.module';

const DEBUG = false;

const app = angular
    .module('app', [uirouter,core,gmap,marker,map,charts,ngMaterial,layout])
    .config(['$mdThemingProvider',theming])
    .config(['$urlRouterProvider','$stateProvider',routing])
    .config(['$httpProvider',addInterceptors])

if (DEBUG) {
    app.run(routingEventsLogger);
}
