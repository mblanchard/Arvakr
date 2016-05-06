import InitNotificationSocket from './notification.data.js'

export default function NotificationService(dataservice) { 
  var NOTIFICATION_MAX = 5;
  var notifications = [];

  var getNotifications = function() {
    return notifications;
  };
  
  var removeNotification = function(id) {   
    for( var i=notifications.length-1; i>=0; i--) {
      if( notifications[i].id == id) {
        notifications.splice(i,1);}
    }
    //notifications = [];
  }
  
  var onmessage = function(messageEvent) {
    var args = messageEvent.data.split('_');
      if(notifications.length >=  NOTIFICATION_MAX) notifications.pop();
      notifications.unshift({lat: args[0], lon: args[1], time: args[2], description:args[3], id: args[2]+"_"+Math.random() });
    
  }
  
  var sockets = InitNotificationSocket(dataservice, onmessage)
  
  return {
    getNotifications: getNotifications,
    removeNotification: removeNotification
  }
}
