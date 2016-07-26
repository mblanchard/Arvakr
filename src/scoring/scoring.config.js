import template from './scoring.tpl.html'

export function routing($stateProvider) {

  $stateProvider
    .state('app.scoring', {
      url: '/scoring',
      controller: 'ScoringCtrl',
      controllerAs: 'vm',
      template: template
    });
}