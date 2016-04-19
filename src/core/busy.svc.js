
export default function BusyService($timeout) { 
  var spinnerExists = true;
  var busy = false;

  function startBusy(text) {
    busy = true;
    if (!spinnerExists) {
      var shell = document.getElementById('container');
      angular.element(shell).append('<div id="busy" class="overlay-shown"><div id="spinnerContainer"><div class="drip"></div></div><span id="spinnerText">' + text + '</span></div>');
      spinnerExists = true;
    }
    else {
      document.getElementById('spinnerText').innerHTML = text;
    }
  }
  
  function stopBusy() {
    busy = false;
    $timeout(function () {
      if (!busy && spinnerExists) {
        var busyEl = document.getElementById('busy');
        busyEl.parentElement.removeChild(busyEl);
        spinnerExists = false;
      }
    }, 600);
  }
  
  stopBusy();
  
  var service = {
    startBusy: startBusy,
    stopBusy: stopBusy
  };
  return service;        
};
