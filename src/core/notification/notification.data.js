export default function InitNotificationSocket(dataservice, onmessage, onopen) {
  
  //Add Endpoints
  var notificationSocket = dataservice.addSocket('notification', '/api/notification', onmessage, onopen);
  
  //END Add Endpoints
  
  //Exposed Endpoints/Mapping
  return {
    notificationSocket: notificationSocket
  }
  //END Exposed Endpoints/Mapping  

}


