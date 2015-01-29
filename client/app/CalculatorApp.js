'use strict';
angular.module('CalculatorApp', []);

angular.module('CalculatorApp').directive('calculator', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/calculator.template.html',
    scope: {},
    controller: function() {
      // this controller is mostly for planning comments:
      // DONE: individual key directives set up events for their action
      // DONE: the keys tell interpreter they were fired
      // implicit: the interpreter directly reads/writes to memory
      // TODO: the interpreter acts based on keys fired & memory values
      // TODO: if the interpreter needs a calculation, call cruncher
      // TODO: cruncher returns calculation results
      // TODO: the interpreter updates memory as necessary
      // DONE: the screen reads formatted value from memory
    }
//    link: function(scope, element, attrs) {
//    }
  };
});

