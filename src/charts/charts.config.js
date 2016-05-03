import template from './charts.tpl.html'

export function routing($stateProvider) {

  $stateProvider
    .state('app.charts', {
      url: '/charts',
      controller: 'ChartsCtrl',
      controllerAs: 'vm',
      template: template
    });
}