export default function InitScoringApi(dataservice) {
  dataservice.addEndpoint('updating scoring conditionals', {
    method: 'post',
    url: 'api/datasetMetadata/scoringConditionals'
  });
    
  return {   
    //Dataset Metadata
    getDatasets: function(){return dataservice.request('updating scoring conditionals')}
  }
}  
