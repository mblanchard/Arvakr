import angular from 'angular';

import { routing } from './querybuilder.config.js';
import QueryBuilderCtrl from './querybuilder.ctrl.js';

export default angular.module('app.querybuilder', [])
    .config(routing)
    .controller('QueryBuilderCtrl', QueryBuilderCtrl)
    .name;