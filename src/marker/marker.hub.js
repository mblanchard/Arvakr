
import 'angular-signalr';

export default function MarkerHub($rootScope, Hub, $timeout) { 
  
  var markerData = {};
  var hub = {};
  
  
  function initialize(datasets) {
    datasets.forEach(function(dataset){
      markerData[dataset] = {};
    });
    
    hub = new Hub('marker', {
      listeners: {
        'markerData': function(dataset,markerId,time,value) {
          
        }
      }  
    });
  }
  var hub = new Hub('marker', {
    listeners: {
      'markerData': function(dataset,marker,time) {
        
      }
    }
  })
  
  return {
    
  }
};