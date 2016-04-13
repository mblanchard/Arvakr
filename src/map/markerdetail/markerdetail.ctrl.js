export default function MarkerDetailCtrl($scope, $q, $timeout, authservice, $mdDialog) {
  const vm = this;
  var apiMarkerDetails = $scope.$parent.vm.markerDetails;
  vm.markerDetails = [];

  for (var detailName in apiMarkerDetails) {
  	if (detailName == "Time") continue;
  	vm.markerDetails.push({
  		"key": detailName.split(/(?=[A-Z])/).join(' '),
  		"value": convertToDisplayString(detailName, apiMarkerDetails[detailName])
  	});
  }

  vm.showChart = function(){
    $mdDialog.hide();
  }
  
  vm.closeDialog = function () {
    $mdDialog.cancel();
  }

  return vm;
}

function convertToDisplayString(key, value) {
	const degreeSymbol = "\u00B0";

	switch (key) {
		case "Latitude":
			return value > 0 ? value/1000000 + degreeSymbol + " N" : -1*value/1000000 + degreeSymbol + " S";
		case "Longitude":
			return value > 0 ? value/1000000 + degreeSymbol + " E" : -1*value/1000000 + degreeSymbol + " W";
		case "ApparentTemperatureMax":
		case "ApparentTemperatureMin":	
		case "TemperatureMax":
		case "TemperatureMin":
			return value + degreeSymbol + " F";
		case "ApparentTemperatureMaxTime":
		case "ApparentTemperatureMinTime":
		case "SunriseTime":
		case "SunsetTime":
		case "TemperatureMaxTime":
		case "TemperatureMinTime":
			return (new Date(value*1000)).toLocaleTimeString();
  	default:
		return value;
	}
}

