export default function AddMapEndpoints(dataservice) {
  
  //getWeatherMarkers
  dataservice.addEndpoint('retrieving weather markers', 
    {
      method: 'get',
      url: 'api/weather/nodes',
    }
  );    
  
  
  return {
    getWeatherMarkers: function() { return dataservice.request('retrieving weather markers');},
  }  
}