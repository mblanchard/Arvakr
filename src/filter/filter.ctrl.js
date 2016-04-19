import FilterService from './filter.data.js';


export default function FilterCtrl($scope, $q, $timeout, dataservice) {

  FilterService(dataservice); 
  const vm = this;
 
  activate();

  function activate() {
    var promises = [];
    return $q.all(promises).then(function () {
    });
  }

}