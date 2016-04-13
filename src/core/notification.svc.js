
export default function NotificationService() { 
  var notifications = ['one', 'two', 'three'];

  var getNotifications = function() {
      return notifications;
  };
  
  return {
    getNotifications: getNotifications
  }
}
