import template from './timeslider.tpl.html';

export default function timeSlider() {
  
  TimeSliderController.$inject = ['$scope','$q','markerservice'];
  /* @ngInject */
  function TimeSliderController($scope,$q,markerservice) {
    var vm = this;
    vm.showControls = false;

    vm.timeOffset = 0;

    var setOffsetString = function() {
      var now = new Date();
      var then = new Date ( now );
      then.setHours ( now.getHours() + vm.timeOffset);
      vm.timeOffsetString = `${then.toLocaleDateString('en-us')}  ${then.getHours()}:00`
    }
    setOffsetString();

    vm.toggleControls = function() {
      vm.showControls = !vm.showControls;
    }

    vm.updateTime = function() {
      setOffsetString();
    }

    vm.updateMarkers = function() {
      markerservice.updateTimeSeriesIndicators(vm.timeOffset);
    }

    vm.controlText = "Test Button"
  }
  return {
    bindToController: true,
    controller: TimeSliderController,
    controllerAs: 'vm',
    restrict: 'EA',
    scope: {
      'navline': '='
    },
    template: template
  } 
}
