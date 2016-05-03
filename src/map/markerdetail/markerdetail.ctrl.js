//material icons
import emptyCloudIcon from './../../assets/images/ic_filter_drama_white_48px.svg' //partly cloudy
import snowflakeIcon from './../../assets/images/ic_ac_unit_white_48px.svg' //snow, sleet
import pinwheelIcon from './../../assets/images/ic_toys_white_48px.svg' //windy
import sunIcon from './../../assets/images/ic_brightness_7_white_48px.svg' //sunny
import cloudIcon from './../../assets/images/ic_cloud_white_48px.svg' //cloudy
import dropletIcon from './../../assets/images/ic_opacity_white_48px.svg' //rain
import fogIcon from './../../assets/images/ic_texture_white_48px.svg' //fog
import warningIcon from './../../assets/images/ic_report_problem_white_48px.svg' //unknown

export default function MarkerDetailCtrl($scope, $q, $timeout, authservice, $mdDialog) {
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
  	for (var detailName in apiMarkerDetails) {
	  	if (detailName == "Time") continue;
	  	else if (detailName == "Icon") {
	  		vm.iconName = apiMarkerDetails[detailName];
	  		continue;
	  	}
	  	vm.markerDetails.push({
	  		"key": detailName.split(/(?=[A-Z])/).join(' '),
	  		"value": convertToDisplayString(detailName, apiMarkerDetails[detailName])
	  	});
			
			$scope.myChartObject = {
				"type": "AreaChart",
				"displayed": false,
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
		}
  }

  vm.showChart = function() {
    vm.showGraph = !vm.showGraph;
  }
  
  vm.closeDialog = function () {
    $mdDialog.cancel();
  }

  return vm;
}

//possible icon values given by https://developer.forecast.io/docs/v2
function getIcon(iconName) {
	switch(iconName) {
		case "clear-day":
		case "clear-night":
			return sunIcon;
		case "rain":
			return dropletIcon;
		case "snow":
		case "sleet":
			return snowflakeIcon;
		case "wind":
			return pinwheelIcon;
		case "fog":
			return fogIcon;
		case "cloudy":
			return cloudIcon;
		case "partly-cloudy-day":
		case "partly-cloudy-night":
			return emptyCloudIcon;
		default:
			return warningIcon;
	}
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
		case "DewPoint":
			return value + degreeSymbol + " F";
		case "ApparentTemperatureMaxTime":
		case "ApparentTemperatureMinTime":
		case "SunriseTime":
		case "SunsetTime":
		case "TemperatureMaxTime":
		case "TemperatureMinTime":
			return (new Date(value*1000)).toLocaleTimeString();
		case "PrecipIntensity":
		case "PrecipIntensityMax":
			return value + " in/hr";
		case "Ozone":
			return value + " DU";
		case "CloudCover":
		case "Humidity":
		case "PrecipProbability":
			return (value*100).toFixed(2) + "%";
		case "Pressure":
			return value + " mb";
		case "Visibility":
			return value + " mi";
		case "WindBearing":
			return value + degreeSymbol;
		case "WindSpeed":
			return value + " mph";
		case "Performance":
			return (value*15).toFixed(2) + " kW";
  	default:
		return value;
	}
}

