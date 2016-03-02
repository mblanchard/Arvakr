export default function FilterService(dataservice) {
  
  //getFilters
  dataservice.addEndpoint('getFilters',  function($http, $q) {
    return $http.get(dataservice.generateUrl('/api/filters')).
      then(success)
      .catch(fail);
  
    function success(response) {
      return response.data;
    }
    function fail(e) {
      //return exception.catcher('XHR Failed for getColumns')(e);
    }
  });
  
  //getFilters
  dataservice.addEndpoint('postFilters',  function($http, $q, filters) {
    return $http.post(dataservice.generateUrl('/api/filters'), filters).
      then(success)
      .catch(fail);
  
    function success(response) {
      return response.data;
    }
    function fail(e) {
      //return exception.catcher('XHR Failed for getColumns')(e);
    }
  });
  
}