import template from './querybuilder.tpl.html'

export function routing($stateProvider) {

    $stateProvider
        .state('app.querybuilder', {
            url: '/querybuilder',
            controller: 'QueryBuilderCtrl',
            controllerAs: 'vm',
            template: template
        });
}