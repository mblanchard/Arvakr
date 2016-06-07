export default function InitMarkerApi(dataservice, onInverterMessage, onInverterOpen) {
  
  //getWeatherMarkers
  dataservice.addEndpoint('retrieving weather markers', 
    {
      method: 'get',
      url: 'api/weatherNode',
    }
  );    
  
  dataservice.addEndpoint('retrieving daily weather data',
    {
      method: 'get',
      url: 'api/weatherDaily'
    }
  );
    
  dataservice.addEndpoint('retrieving recent daily weather data',
    {
      method: 'get',
      url: 'api/weatherDaily'
    }
  );
  
  dataservice.addEndpoint('retrieving inverter markers',
    { 
      method: 'get',
      url: 'api/inverterNode'
    }
  );
  
    dataservice.addEndpoint('retrieving recent inverter data',
    { 
      method: 'get',
      url: 'api/inverterNode'
    }
  );
  
  
  var inverterSocket = dataservice.addSocket('inverter', 'api/inverterNode/MOCK_WS_INVITE/connect', onInverterMessage, onInverterOpen);
  //var inverterSocket = {};
    
  return {
    //weather
    getWeatherMarkers: function(lat,lon) { return dataservice.request('retrieving weather markers');},
    getDailyWeatherData: function(lat,lon,time) { return dataservice.request('retrieving daily weather data', {},'/'+ lat + '/' + lon + '/' + time + '/');},
    getRecentDailyWeatherData: function(lat,lon) { return dataservice.request('retrieving recent daily weather data', {},'/'+ lat + '/' + lon + '/latest');},
    
    //inverter
    getInverterMarkers: function() { return dataservice.request('retrieving inverter markers');},
    getRecentInverterData: function(lat,lon) { return dataservice.request('retrieving recent inverter data', {},'/'+ lat + '/' + lon + '/latest');}, 
    inverterSocket: inverterSocket
  }
}  




