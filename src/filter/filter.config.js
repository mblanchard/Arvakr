import template from './filter.tpl.html'

export function routing($stateProvider) {

  $stateProvider
    .state('app.filter', {
      url: '/filter',
      controller: 'FilterCtrl',
      controllerAs: 'vm',
      template: template
    });
}