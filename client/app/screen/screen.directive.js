'use strict';

angular.module('CalculatorApp').directive('screen',
['memory', function(memory) {
  return {
    restrict: 'E',
    templateUrl: 'app/screen/screen.template.html',
    scope: {},
    controller: function($scope) {
      $scope.memory = memory;
      $scope.format = function(value) {
        return value;
      };
    }
  };
}]);