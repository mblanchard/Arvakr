export default function MapService(dataservice) {
  
  
  //getColumns
  dataservice.addEndpoint('getColumns',  function($http, $q, moduleId) {
    return $http.get(dataservice.generateUrl('/api/column/' + moduleId)).
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