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
    getAtTime: function(dataset,id,time) {return dataservice.request('retrieving timeseries data', {}, `${dataset}/${id}/${time}`)},
    getInTimeRange: function(dataset,id,timeStart,timeEnd) {return dataservice.request('retrieving timeseries data', {}, `${dataset}/${id}/${timeStart}/${timeEnd}`)},
    getRecent: function(dataset,id) {return dataservice.request('retrieving timeseries data', {}, `${dataset}/${id}/latest`)},

    //Geopatial
    get: function(dataset) {return dataservice.request('retrieving geospatial data',{}, `${dataset}`)},
    getById: function(dataset,id) {return dataservice.request('retrieving geospatial data',{}, `${dataset}/${id}`)},
    getAtLocation: function(dataset,lat,lon) {return dataservice.request('retrieving geospatial data',{}, `${dataset}/${lat}/${lon}`)},
    getNearLocation: function(dataset,lat,lon) {return dataservice.request('retrieving geospatial data',{}, `${dataset}/${lat}/${lon}/nearby`)},
   
    //Dataset Metadata
    getDatasets: function(){return dataservice.request('retrieving geospatial dataset list')}
  }
}  




