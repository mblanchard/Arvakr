
export default function NotificationService() { 
  var notifications = [
  {
  	lat: 30238386,
  	lon: -50206529,
  	time: 1460580372
  },
  {
  	lat: -23132955,
  	lon: 121482857,
  	time: 1460581280
  }];

  var getNotifications = function() {
      return notifications;
  };
  
  return {
    getNotifications: getNotifications
  }
}
