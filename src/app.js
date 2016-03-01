
import 'angular-material/angular-material.min.css';
import './app.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import ngAnimate from 'angular-animate/angular-animate.min.js';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material'

import { routing, routingEventsLogger, theming } from './app.config';

import common from './common/common.module';
import core from './core/core.module';


import map from './map/map.module';
import filter from './filter/filter.module';


const DEBUG = false;

const app = angular
    .module('app', [uirouter, common,core,map,filter,ngMaterial])
    .config(['$mdThemingProvider',theming])
    .config(['$urlRouterProvider','$stateProvider',routing])



if (DEBUG) {
    app
        .run(routingEventsLogger)
    ;
}
