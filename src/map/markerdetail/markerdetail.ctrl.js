//material icons
import emptyCloudIcon from './../../assets/images/ic_filter_drama_white_48px.svg' //partly cloudy
import snowflakeIcon from './../../assets/images/ic_ac_unit_white_48px.svg' //snow, sleet
import pinwheelIcon from './../../assets/images/ic_toys_white_48px.svg' //windy
import sunIcon from './../../assets/images/ic_brightness_7_white_48px.svg' //sunny
import cloudIcon from './../../assets/images/ic_cloud_white_48px.svg' //cloudy
import dropletIcon from './../../assets/images/ic_opacity_white_48px.svg' //rain
import fogIcon from './../../assets/images/ic_texture_white_48px.svg' //fog
import warningIcon from './../../assets/images/ic_report_problem_white_48px.svg' //unknown

export default function MarkerDetailCtrl($scope, $q, $timeout, authservice, $mdDialog, geoservice) {
  const vm = this;
  var apiMarkerData = $scope.$parent.vm.selectedMarker.details;
	vm.datasetName = $scope.$parent.vm.selectedMarker.dataset;
  
	vm.markerData = {};
	vm.markerName = apiMarkerData.Name || vm.datasetName;
	vm.selectedDatasetId = 0;
  vm.iconName = warningIcon; //will be overwritten by getIcon
	vm.chartAvailable = false;
	vm.endDate = new Date();
	vm.startDate = new Date(); vm.startDate.setDate(vm.endDate.getDate()- 2);
	vm.chartFields = [];

	activate();
 
  function activate() {
    var promises = [init()];
    return $q.all(promises).then(function () {
	  	var img = document.createElement('img');
			img.src = getIcon(vm.iconName);
			document.getElementById('icon-div').appendChild(img);
			vm.datasetEndpoints = [{"Name":vm.datasetName, "DisplayName":vm.datasetName.split(/(?=[A-Z])/).join(' ')}].concat(getDatasetEndpoints());
			vm.getData();
		});
  }

	function getDatasetEndpoints() {
		var datasets = geoservice.getDatasets();
		var selectedDataset = datasets.find(function(d) {return d.Name == vm.datasetName});
		if(selectedDataset != null) {
			return selectedDataset.TimeSeriesEndpoints;
		}
	}

	vm.getData = function() {
		var lat = apiMarkerData.Latitude;
		var lon = apiMarkerData.Longitude;
		var endpoint = vm.datasetEndpoints[vm.selectedDatasetId];
		if(endpoint.Name == vm.datasetName) {vm.markerData = createHumanReadableDetails(apiMarkerData); vm.chartAvailable = false;}
		else {
			geoservice.getRecent(endpoint,lat,lon).then(function(response) { 
				vm.markerData = createHumanReadableDetails(response); 
				vm.chartFields = [];
				Object.keys(response).reduce(
					function(arr,value) { 
						if(!isNaN(response[value])) { var field = {}; field.name = value; field.isActive =false; arr.push(field)}
						return arr; 
					},vm.chartFields);
				vm.chartAvailable = true;
			});
		}
	}

	//Mocking out functionality
	vm.renderChart = function() {
		var lat = apiMarkerData.Latitude;
		var lon = apiMarkerData.Longitude;
		var endpoint = vm.datasetEndpoints[vm.selectedDatasetId];

		var end = vm.endDate / 1000 | 0;
	  var start = vm.startDate / 1000 | 0;
		geoservice.getInTimeRange(endpoint,lat,lon,start,end).then(function(response) { 
			if(response.length > 0) {
								
				var chartHeader = ["Time"];

				vm.chartFields.reduce(function(headers, field) {
					if(field.isActive) {headers.push(field.name)}
					return headers;
				},chartHeader );
				if(chartHeader.length <= 1) { return; }
				console.log(chartHeader);

				var chartData = response.map(function(x) { 
					var arr = [new Date(x["Time"]*1000)]; for(var i =1; i < chartHeader.length; i++){arr.push(x[chartHeader[i]])} return arr;
				});
				
				$scope.chart.data = [chartHeader].concat(chartData);

			}

		});		
	}

	function createHumanReadableDetails(markerDetails) {
		var details = {};
		for (var detailName in markerDetails) {
			if (detailName == "Time") continue;
			else if (detailName == "Icon") {
				//vm.iconName = markerDetails[detailName];
				continue;
			}
			details[detailName.split(/(?=[A-Z])/).join(' ')] = convertToDisplayString(detailName, markerDetails[detailName]);
		}
		return details;
	}

  function init(){
		vm.markerDetails = createHumanReadableDetails(apiMarkerData);


				
		
		$scope.chart = {
			"type": "LineChart",
			"options": {
				"title": vm.markerName,
				'width':450,
				'height':300,
				'chartArea':{'left':50,'top':25,'width':'60%','height':'75%'},
				"isStacked": "false",
				"displayExactValues": true,
				"vAxis": {
					"gridlines": {
						"count": 10
					}
				}
			},
			"formatters": {},
		}
  }

  vm.showChart = function() {
    vm.showGraph = !vm.showGraph;
		if(vm.showGraph) {
			vm.renderChart();
		}
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

