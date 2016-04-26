import InitNotificationSocket from './notification.data.js'

export default function NotificationService(dataservice) { 
  var NOTIFICATION_MAX = 5;
  var notifications = [
  {
  	lat: 41879751,
  	lon: -87634685,
  	time: 1460580372,
    description: "Attack ships on fire off the shoulder of Orion"
  },
  {
  	lat: 41960187,
  	lon: -87848580,
  	time: 1460581280,
    description: "C-beams glitter in the dark near the Tannhauser Gate"
  }];

  var getNotifications = function() {
    return notifications;
  };
  
  var onmessage = function(messageEvent) {
    var args = messageEvent.data.split('_');
    notifications.unshift({lat: args[0], lon: args[1], time: args[2], description:args[3]});
    if(notifications.length >  NOTIFICATION_MAX) notifications.pop();  
  }
  
  var sockets = InitNotificationSocket(dataservice, onmessage)
  
  return {
    getNotifications: getNotifications
  }
}
