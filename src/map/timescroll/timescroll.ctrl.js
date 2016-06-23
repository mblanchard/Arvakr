
export default function TimeScrollController($scope, $q, $timeout, authservice, $mdDialog) {
  const vm = this;
  var apiMarkerDetails = $scope.$parent.vm.markerDetails;
  vm.markerDetails = [];
  vm.iconName = warningIcon; //will be overwritten by getIcon
	vm.showGraph = false;

	activate();
 
  function activate() {
    var promises = [init()];
    return $q.all(promises).then(function () {
	  	var img = document.createElement('img');
			img.src = getIcon(vm.iconName);
			document.getElementById('icon-div').appendChild(img);
		});
  }

  function init(){
		
	}



  return vm;
}



