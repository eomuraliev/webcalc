'use strict';

angular.module('CalculatorApp').factory('interpreter', function(memory, $http) {
  var locked = false,
      justUsedEquals = false;

  function performBinaryOperationInMemory(onSuccess) {
    locked = true;
    $http.post('/api/calculate', {
      operation: memory.operation,
      currentValue: memory.currentValue,
      storedValue: memory.storedValue
    }).success(function(data) {
      if (typeof data.result === 'string' &&
        typeof data.error === 'undefined') {
        memory.clearAll();
        memory.setCurrentValue(data.result);
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      }
      else {
        handleErrorResponse();
      }
      locked = false;
    }).error(function() {
      handleErrorResponse();
      locked = false;
    });
  }

  function performUnaryOperation(operation, onSuccess) {
    locked = true;
    $http.post('/api/calculate', {
      operation: operation,
      currentValue: memory.currentValue,
      storedValue: memory.storedValue
    }).success(function(data) {
      if (typeof data.result === 'string' &&
        typeof data.error === 'undefined') {
        if (typeof onSuccess === 'function') {
          onSuccess(data.result);
        }
      }
      else {
        handleErrorResponse();
      }
      locked = false;
    }).error(function() {
      handleErrorResponse();
      locked = false;
    });
  }

  function handleErrorResponse() {
    memory.error = true;
  }

  return {
    isLocked: function() {
      return locked;
    },
    entry: function(value) {
      console.log('entry: ' + value);
      if (this.isLocked() || memory.error) {
        console.log('interpreter is locked or there is an error. ignoring entry');
        return;
      }
      // if someone had just used the equals op, and starts typing numbers we clear the screen
      if (justUsedEquals) {
        justUsedEquals = false;
        memory.clearCurrentValue();
      }
      // so when someone presses + and starts typing in numbers
      if (memory.hasOperation() && !memory.hasStoredValue()) {
        memory.setStoredValue(memory.currentValue);
        memory.clearCurrentValue();
      }
      switch (memory.currentValue) {
        case '0':
          memory.setCurrentValue(value);
          break;
        default:
          memory.setCurrentValue(memory.currentValue + value);
      }
    },
    operation: function(operation) {
      console.log('operation: ' + operation);
      if ( this.isLocked() ||
           (memory.error &&
            operation !== 'clear' &&
            operation !== 'all_clear'
           )
         ) {
        console.log('interpreter is locked or there is an error. ignoring operation');
        return;
      }
      if (justUsedEquals) {
        justUsedEquals = false;
      }
      switch (operation) {
        case 'all_clear':
          memory.clearAll(true);
          break;

        case 'clear':
          memory.clearCurrentValue();
          break;

        case 'reverse_sign':
          if (memory.currentValue.charAt(0) === '-') {
            memory.setCurrentValue(memory.currentValue.substr(1));
          }
          else {
            memory.setCurrentValue('-' + memory.currentValue);
          }
          break;

        case 'equals':
          if (memory.hasOperation() && memory.hasStoredValue()) {
            memory.lastEqualsAction = {
              value: memory.currentValue,
              operation: memory.operation
            };
            performBinaryOperationInMemory();
          }
          else if (memory.lastEqualsAction !== undefined &&
                   typeof memory.lastEqualsAction.value === 'string' &&
                   typeof memory.lastEqualsAction.operation === 'string') {
            memory.setStoredValue(memory.currentValue);
            memory.setCurrentValue(memory.lastEqualsAction.value);
            memory.setOperation(memory.lastEqualsAction.operation);
            performBinaryOperationInMemory();
          }
          justUsedEquals = true;
          break;

        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
          if (memory.hasOperation() && memory.hasStoredValue()) {
            performBinaryOperationInMemory(function() {
              memory.setOperation(operation);
            });
          }
          else {
            memory.setOperation(operation);
          }
          break;
        case 'percentage':
          performUnaryOperation(operation, function(resultValue) {
            memory.setCurrentValue(resultValue);
          });
          break;
      }

    }
  };
});