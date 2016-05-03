import template from './chartTile.tpl.html'

export default function chartTile() {
  
  ChartTileCtrl.$inject = ['$scope','$q','$timeout','dataservice'];
  function ChartTileCtrl($scope, $q, $timeout, dataservice) {
    const vm = this; 
    vm.chartName = "Chart Name"
    
    vm.chart = {
      "type": "AreaChart",
      "displayed": true,
      "data": {
        "cols": [
          { "id": "time", "label": "Time", "type": "string","p": {} },
          { "id": "projected", "label": "Projected", "type": "number","p": {} },
          { "id": "actual", "label": "Actual", "type": "number","p": {} }
        ],
        "rows": [
          {c: [ {"v": "5am"},{"v": 1},{"v": 0.5} ]},
          {c: [ {"v": "8am"},{"v": 3},{"v": 3} ]},
          {c: [ {"v":"11am"},{"v": 5},{"v": 4} ]},
          {c: [ {"v": "2pm"},{"v": 4.5},{"v": 5} ]},
          {c: [ {"v": "5pm"},{"v": 3.5},{"v": 4} ]},
          {c: [ {"v": "8pm"},{"v": 2},{"v": 2.5} ]},
        ]
      },
      "options": {
        "title": "Actual Output vs. Projected",
        'width':350,
        'height':200,
        'chartArea':{'left':50,'top':25,'width':'60%','height':'75%'},
        "isStacked": "false",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
          "gridlines": {
            "count": 10
          }
        }
      },
      "formatters": {},
      "view": {
        "columns": [
          0,
          1,
          2
        ]
      }
    }
    
    return vm;
  }
  
  return {
    bindToController: true,
    controller: ChartTileCtrl,
    controllerAs: 'vm',
    restrict: 'EA',
    scope: {
      'navline': '='
    },
    template: template
  } 
}