export default function QueryBuilderService(dataservice) {
  
  //getModules
  dataservice.addEndpoint('getModules', function($http, $q){
    return $http.get(dataservice.generateUrl('/api/module'))
      .then(success)
      .catch(fail);
    
    function success(response) {
      return response.data;
    }
    
    function fail(e) {
      //return exception.catcher('XHR Failed for getModules')(e);
    }
  })
  
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
  
  //getOperators
  dataservice.addEndpoint('getOperators',function($http, $q, operatorType) {
    return $http.get(dataservice.generateUrl('/api/operator/' + operatorType)).
      then(success)
      .catch(fail);

    function success(response) {
      return response.data;
    }
    function fail(e) {
      //return exception.catcher('XHR Failed for getOperators')(e);
    }
  })
}