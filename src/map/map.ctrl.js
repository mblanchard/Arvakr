import AddMapEndpoints from './map.data.js';


export default function MapCtrl($scope, $q, $timeout, dataservice, gmapservice) {

  AddMapEndpoints(dataservice); 
  const vm = this;
  
  activate();
 
  function activate() {
    var promises = [];
    return $q.all(promises).then(function () {
      console.log(vm.map);
      drawMap();
    });
  }
  
  function drawMap() {
    $timeout(function () {
      vm.map = gmapservice.map;
      vm.mapNodes = gmapservice.mapNodes;
    });
  }
  
}