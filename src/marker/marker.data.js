export default function InitMarkerApi(dataservice, onInverterMessage, onInverterOpen) {
  
  
  
  var inverterSocket = dataservice.addSocket('inverter', 'api/inverterNode/MOCK_WS_INVITE/connect', onInverterMessage, onInverterOpen);
 
  return {
    inverterSocket: inverterSocket
  }
}  




