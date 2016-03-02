export default function MapService(dataservice) {
  
  //getMarkers
  dataservice.addEndpoint('getMarkers',  function($http, $q) {
    return $http.get(dataservice.generateUrl('/api/markers')).
      then(success)
      .catch(fail);
  
    function success(response) {
      return response.data;
    }
    function fail(e) {
      //return exception.catcher('XHR Failed for getColumns')(e);
    }
  })

}