'use strict';

angular.module('CalculatorApp').factory('memory', function() {
  var MAX_VALUE_LENGTH = 9;

  function Memory() {
    this.clearAll(true);
  }

  Memory.prototype.setCurrentValue = function(value) {
    var maxOffset = 0;
    if (valueLength(value) <= MAX_VALUE_LENGTH ) {
      this.currentValue = value;
    }
    else {
      if (value.indexOf('.') >= 0) {
        maxOffset +=1;
      }
      if (value.indexOf('-') === 0) {
        maxOffset +=1;
      }
      this.currentValue = value.substr(0, MAX_VALUE_LENGTH + maxOffset);
    }
  };

  function valueLength(value) {
    return value.replace(/[\D\.]/g, '').length;
  }

  Memory.prototype.setStoredValue = function(value) {
    this.storedValue = value;
  };

  Memory.prototype.hasStoredValue = function() {
    return this.storedValue !== undefined;
  };

  Memory.prototype.setOperation = function(operation) {
    this.operation = operation;
  };

  Memory.prototype.hasOperation = function() {
    return this.operation !== undefined;
  };

  Memory.prototype.clearCurrentValue = function() {
    this.currentValue = '0';
    this.error = false;
  };

  Memory.prototype.clearAll = function(hard) {
    this.currentValue = '0';
    this.error = false;
    this.storedValue = undefined;
    this.operation = undefined;
    if (hard === true) {
      this.lastEqualsAction = undefined;
    }
  };

  return new Memory();
});