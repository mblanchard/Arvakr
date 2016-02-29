import QueryBuilderService from './querybuilder.svc.js';

export default function QueryBuilderCtrl($scope, $q, $timeout, dataservice) {

  QueryBuilderService(dataservice); 
  const vm = this;
  
  vm.columns = null;
  vm.criteria = [];
  vm.typeOperatorMapping = {};
  vm.criteriaTypeMapping = { Amount: "int", Stock: "int", Ledger: "string", Volume: "int" }; //TODO: add all criteria
  vm.operatorIdMapping = [];
  vm.count = 5;
  vm.types = ["int", "string"];
  activate();

  function activate() {
    var DEFAULT_MODULE_ID = 'asdf'; //TODO: Bind this to selected module id
    var promises = [];
    return $q.all(promises).then(function () {
      //logger.info('Retrieved Query Builder Data');
    });
  }
          function getColumnsByModuleId(moduleId) { //(get available criteria)
            return dataservice.request('getColumns',moduleId).then(function (data) {
                console.log(data);
                vm.columns = data;
                //add first criterion here(?)
                vm.addCriterion();
                return vm.columns;
            });
        }

        function getOperatorIdMappings() {
            return dataservice.request('getOperators',"").then(function (data) {
                vm.operatorIdMapping = data;
                return vm.operatorIdMapping;
            });
        }

        function getOperatorTypeMapping() {
            for (var i = 0; i < vm.types.length; i++) {
                getOperatorsByType(vm.types[i]);
            }
        }

        function getOperatorsByType(type) {
            return dataservice.request('getOperators',type).then(function (data) {
                vm.typeOperatorMapping[type] = data;
                return vm.typeOperatorMapping;
            });
        }

        vm.criteriaSelected = function criteriaSelected(index) {
            var selectedCriteria = vm.criteria[index].selectedColumn;
            var criteriaType = vm.criteriaTypeMapping[selectedCriteria];
            var opsAvail = vm.typeOperatorMapping[criteriaType];
            vm.criteria[index].availableOperators = opsAvail;
            $timeout(function () {
                $('#operator-' + index).material_select();
            });
        }

        vm.addCriterion = function addCriterion() {
            vm.criteria.push({});
            console.log(vm.criteria);
            console.log(vm);
        }

        vm.revoveCriterion = function removeCriterionByIndex(idx) {
            if (vm.criteria.length > 1) { //must have at least 1 criteria
                vm.criteria.splice(idx, 1);
            } else {
                //logger.info('You must have at least 1 criterion');
            }
            $timeout(function () {
                $('select').material_select();
            });
        }

        vm.clearAll = function clearAll() {
            vm.criteria.splice(1, vm.criteria.length - 1);
            vm.criteria[0].selectedOperator = "";
            vm.criteria[0].selectedColumn = "";
            vm.criteria[0].value = "";
            $timeout(function () {
                $('#item-0').material_select();
                $('#operator-0').material_select();
            });
        }

        function replacer(key, value) {
            if (key === "availableOperators") {
                return undefined;
            }
            return value;
        }

        vm.runQuery = function runQuery() {
            var returnJson = JSON.stringify(vm.criteria, replacer);
            //TODO: do something with returnJson
        }

        vm.testLoadQuery = function testLoadQuery() {
            vm.loadQuery([{ selectedColumn: "Stock", selectedOperator: "GTE", value: "a" },
                          { selectedColumn: "Ledger", selectedOperator: "E", value: "b" },
                          { selectedColumn: "Volume", selectedOperator: "LT", value: "c" }]);
        }
        //TODO: pass in loadedCriteria and get rid of test function
        vm.loadQuery = function loadQuery(loadedCriteria) {
            vm.criteria = loadedCriteria;
            $timeout(function () {
                $('select').material_select();
            });
            for (var i = 0; i < vm.criteria.length; i++) {
                vm.criteriaSelected(i); //set up available operators for each criteria
            }
        }


}