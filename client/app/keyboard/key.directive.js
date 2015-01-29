//TODO: this directive is unneeded. Remove.
'use strict';

angular.module('CalculatorApp').directive('key', function() {
  return {
    restrict: 'E',
    scope: {
      type: '@', // `entry` or `operation`
      value: '@' // number, dot, or one of the operations
    },
    controller: function($scope) {
      // inject the interpreter
      if ($scope.type !== 'entry' && $scope.type !== 'operation') {
        throw new TypeError('Invalid `type` provided for the `key` directive');
      }
    }
    // clicks are handled at the keyboard layer (event delegation)
  };
});