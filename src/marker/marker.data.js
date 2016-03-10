export default function InitMarkerApi(dataservice) {
  
  //getMarkers
  dataservice.addEndpoint('getMarkers', 
    {
      method: 'get',
      url: '/api/markers',
    }
  );   
  
   //getMarkers
  dataservice.addEndpoint('getMarkerIcons', 
    {
      method: 'get',
      url: '/api/markerIcons',
    }
  );  
  
  return {
    getMarkers: function() { dataservice.request('getMarkers');},
    getMarkerIcons: function() {dataservice.request('getMarkerIcons')}
  }  

}


