
export default function NotificationService() { 
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
  
  return {
    getNotifications: getNotifications
  }
}
