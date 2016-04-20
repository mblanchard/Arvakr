export default function InitMarkerApi(dataservice, onInverterMessage, onInverterOpen) {
  
  //getWeatherMarkers
  dataservice.addEndpoint('retrieving weather markers', 
    {
      method: 'get',
      url: 'api/weather/nodes',
    }
  );    
  
  dataservice.addEndpoint('retrieving daily weather data',
    {
      method: 'get',
      url: 'api/weather'
    }
  );
    
  dataservice.addEndpoint('retrieving recent daily weather data',
    {
      method: 'get',
      url: 'api/weather'
    }
  );
  
  dataservice.addEndpoint('retrieving inverter markers',
    { 
      method: 'get',
      url: 'api/inverter/nodes'
    }
  );
  
    dataservice.addEndpoint('retrieving recent inverter data',
    { 
      method: 'get',
      url: 'api/inverter'
    }
  );
  
  
  var inverterSocket = dataservice.addSocket('inverter', 'api/inverter', onInverterMessage, onInverterOpen);
    
  return {
    //weather
    getWeatherMarkers: function() { return dataservice.request('retrieving weather markers');},
    getDailyWeatherData: function(lat,lon,time) { return dataservice.request('retrieving daily weather data', {},'/'+ lat + '/' + lon + '/' + time + '/daily');},
    getRecentDailyWeatherData: function(lat,lon) { return dataservice.request('retrieving recent daily weather data', {},'/'+ lat + '/' + lon + '/daily');},
    
    //inverter
    getInverterMarkers: function() { return dataservice.request('retrieving inverter markers');},
    getRecentInverterData: function(lat,lon) { return dataservice.request('retrieving recent inverter data', {},'/'+ lat + '/' + lon);}, 
    inverterSocket: inverterSocket
  }
}  




