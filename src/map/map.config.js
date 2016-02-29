import template from './map.tpl.html'

export function routing($stateProvider) {

    $stateProvider
        .state('app.map', {
            url: '/map',
            controller: 'MapCtrl',
            controllerAs: 'vm',
            template: template
        });
}