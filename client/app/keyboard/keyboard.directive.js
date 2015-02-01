'use strict';

angular.module('CalculatorApp').directive('keyboard',
['interpreter', function(interpreter) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/keyboard/keyboard.template.html',
    controller: function($scope) {
      $scope.interpreter = interpreter;
      $scope.showAllClear = true;
    },
    link: function(scope, element) {
      element.on('click', 'key', function(event) {
        if (scope.interpreter.isLocked()) {
          return;
        }

        var keyValue = event.target.getAttribute('value');

        scope.$apply(function() {
          if (event.target.getAttribute('type') === 'entry') {
            scope.interpreter.entry(keyValue);
          } else {
            scope.interpreter.operation(event.target.getAttribute('value'));
          }
          scope.showAllClear = (keyValue === 'clear' || keyValue === 'all_clear');
        });
      });
    }
  };
}]);