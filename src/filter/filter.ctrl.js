import FilterService from './filter.data.js';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

export default function FilterCtrl($scope, $q, $timeout, dataservice) {

  FilterService(dataservice); 
  const vm = this;
 
  activate();

  function activate() {
    vm.editor = ace.edit('editor');
    vm.editor.getSession().setMode('ace/mode/json');
    vm.editor.setTheme('ace/theme/github');
    vm.editor.setValue([
        '{'
      , ' "attribute": "temperature",'
      , ' "foo": "bar",'
      , ' "trailing comma": "to show linting",'
      , '}'
      ].join('\n')
    );
    vm.editor.clearSelection();
    console.log(ace);
    var promises = [];
    return $q.all(promises).then(function () {
    });
  }

}