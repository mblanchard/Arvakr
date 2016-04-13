
import 'angular-signalr-hub';

export default function InitMarkerHub($rootScope, $timeout, Hub, markerCache) { 
  
  var markerData = {};
  var hub = {};
  
  
  function initialize(datasets) {
    datasets.forEach(function(dataset){
      markerData[dataset] = {};
    });
    
    hub = new Hub('marker', {
      listeners: {
        'marker': function(datasetId,markerId, location){
          markerData[datasetId][markerId] = {'location':location};
        },
        'markerData': function(datasetId,markerId,time,value) {
          
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