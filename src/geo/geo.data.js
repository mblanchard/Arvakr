export default function InitMarkerApi(dataservice, onInverterMessage, onInverterOpen) {
  dataservice.addEndpoint('retrieving geospatial dataset list', {
    method: 'get',
    url: 'api/datasetMetadata'
  });

  dataservice.addEndpoint('retrieving timeseries data', { 
    method: 'get',
    url: ''
  });

  dataservice.addEndpoint('retrieving geospatial data', {
    method: 'get',
    url: ''
  });
    
  return {
    //Time Series
    getAtTime: function(dataset,lat,lon,time) {return dataservice.request('retrieving timeseries data', {}, `${dataset}/${lat}/${lon}/${time}`)},
    getInTimeRange: function(dataset,lat,lon,timeStart,timeEnd) {return dataservice.request('retrieving timeseries data', {}, `${dataset}/${lat}/${lon}/${timeStart}/${timeEnd}`)},
    getRecent: function(dataset,lat,lon) {return dataservice.request('retrieving timeseries data', {}, `${dataset}/${lat}/${lon}/latest`)},

    //Geopatial
    get: function(dataset) {return dataservice.request('retrieving geospatial data',{}, `${dataset}`)},
    getAtLocation: function(dataset,lat,lon) {return dataservice.request('retrieving geospatial data',{}, `${dataset}/${lat}/${lon}`)},
    getNearLocation: function(dataset,lat,lon) {return dataservice.request('retrieving geospatial data',{}, `${dataset}/${lat}/${lon}/nearby`)},
   
    //Dataset Metadata
    getDatasets: function(){return dataservice.request('retrieving geospatial dataset list')}
  }
}  




