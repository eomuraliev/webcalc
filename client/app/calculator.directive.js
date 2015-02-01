'use strict';

angular.module('CalculatorApp').directive('calculator', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/calculator.template.html',
    scope: {}
  };
});
