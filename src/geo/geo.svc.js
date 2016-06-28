import InitGeoApi from './geo.data.js'


export default function GeoService($q,$rootScope,$timeout,dataservice) {  
  var geoApi = InitGeoApi(dataservice);
  var datasets = [];

  //Init
  initDatasets();

  function initDatasets() {
    return geoApi.getDatasets().then(function(response) {
      datasets = response;
      datasets.forEach(function(d) {
        d.isActive = true; d.DisplayName = d.Name.split(/(?=[A-Z])/).join(' ');  
        if(d.TimeSeriesEndpoints == null) d.TimeSeriesEndpoints = [];
        d.TimeSeriesEndpoints.forEach(function(t){ t.DisplayName = t.Name.split(/(?=[A-Z])/).join(' ') + " (Time Series)"; })     
      })
      return fetchGeospatialNodes();
    });
  }

  function fetchGeospatialNodes() {    
    var promises = datasets.map(function(d) {
      return get(d).then(function(response) {
        d.nodes = response || []; d.nodes.forEach(
        function(n,i){if(n.Name == null) n.Name = `${d.Name} ${i}`; } 
      );});
    });
    return $q.all(promises).then(function() { $rootScope.$broadcast('geospatial-loaded'); });
  }

  //Enabling Datasets
  function getDatasets() { return datasets; }

  function getActiveDatasets() { return datasets.filter(function(d) { return d.isActive;})}

  function toggleDataset(id) { datasets[id].isActive = !datasets[id].isActive; }

  //Geospatial
  function get(endpoint) {
    return geoApi.get(endpoint.URI).then(function(response){
      return response;
    });
  }

  function getCached(datasetName,id) {
    var dataset = datasets.find(function(d){return d.Name == datasetName});
    if(dataset != null && dataset.nodes != null && dataset.nodes.length > id) {
      return dataset.nodes[id];
    }
  }
  
  function getNearLocation(endpoint,lat,lon) {
    return geoApi.getNearLocation(endpoint.URI,lat,lon).then(function(response){
      return response;
    });
  }
  
  function getAtLocation(endpoint,lat,lon) {

    return geoApi.getAtLocation(endpoint.URI,lat,lon).then(function(response){
      return response;
    });
  
  }

  //Time Series
  function getAtTime(endpoint,lat,lon,time) {
    return geoApi.getAtTime(endpoint.URI,lat,lon,time).then(function(response){
      return response;
    }); 
  }   
  function getInTimeRange(endpoint,lat,lon,timeStart,timeEnd) {
    return geoApi.getInTimeRange(endpoint.URI,lat,lon,timeStart,timeEnd).then(function(response){
      return response;
    });   
  }
  function getRecent(endpoint,lat,lon) {
    return geoApi.getRecent(endpoint.URI,lat,lon).then(function(response){
      return response;
    });
  }
   
  return {
    get: get,
    getCached: getCached,
    getNearLocation: getNearLocation,
    getAtLocation: getAtLocation,
    getAtTime: getAtTime,
    getInTimeRange: getInTimeRange,
    getRecent: getRecent,

    getDatasets: getDatasets,
    getActiveDatasets: getActiveDatasets,
    toggleDataset: toggleDataset
  }
};