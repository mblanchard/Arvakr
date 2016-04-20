export default function InitAuthApi($httpParamSerializer,dataservice) {
  
  //Add Endpoints
  dataservice.addEndpoint('registering', 
    {
      method: 'post',
      url: '/api/account/Register',
    }
  );   
  
  dataservice.addEndpoint('requesting token', 
    {
      method: 'POST',
      url: 'token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );  
  //END Add Endpoints
  
  
  //Exposed Endpoints/Mapping
  return {
    register: function(username, password, confirmPassword) {     
      var data = {
        "userName":username, 
        "password":password, 
        "confirmPassword":confirmPassword
      }
      return dataservice.request('registering', data)
    },
    
    requestToken: function(username, password) {
      var data = {
        "grant_type":"password",
        "userName":username, 
        "password":password
      }
      var serializedData = $httpParamSerializer(data)
      return dataservice.request('requesting token',serializedData)
    }
  }
  //END Exposed Endpoints/Mapping  

}


