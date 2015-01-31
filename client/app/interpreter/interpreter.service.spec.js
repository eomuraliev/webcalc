'use strict';

describe('interpreter service', function() {
  var $injector,
      interpreter,
      memory,
      API_URL= '/api/calculate';

  beforeEach(module('CalculatorApp'));
  beforeEach(inject(function(_$injector_) {
    $injector = _$injector_;
    memory = $injector.get('memory');
    interpreter = $injector.get('interpreter');
  }));

  describe('initial state', function() {
    it('should not be locked', function() {
      expect(interpreter.isLocked()).toBe(false);
    });
  });

  describe('when receiving entries in a normal state', function() {

    it('should assign entry values to memory', function() {
      spyOn(memory, 'setCurrentValue');
      interpreter.entry('1');
      expect(memory.setCurrentValue).toHaveBeenCalledWith('1');
    });

    it('should append entry values if the existing value is not zero', function() {
      memory.setCurrentValue('2.1');
      spyOn(memory, 'setCurrentValue');
      interpreter.entry('1');
      expect(memory.setCurrentValue).toHaveBeenCalledWith('2.11');
    });

    it('should append zero entries properly', function() {
      spyOn(memory, 'setCurrentValue');
      interpreter.entry('.');
      expect(memory.setCurrentValue).toHaveBeenCalledWith('0.');
    });

  });

  describe('when receiving operations in a normal state', function() {

    describe('all_clear', function() {
      it('should call memory.clearAll(true)', function() {
        spyOn(memory, 'clearAll');
        interpreter.operation('all_clear');
        expect(memory.clearAll).toHaveBeenCalledWith(true);
      });
    });

    describe('clear', function() {
      it('should call memory.clearCurrentValue()', function() {
        spyOn(memory, 'clearCurrentValue');
        interpreter.operation('clear');
        expect(memory.clearCurrentValue).toHaveBeenCalled();
      });
    });

    describe('reverse_sign', function() {
      it('should turn positive numbers negative', function() {
        spyOn(memory, 'setCurrentValue');
        interpreter.operation('reverse_sign');
        expect(memory.setCurrentValue).toHaveBeenCalledWith('-0');
      });

      it('should append turn positive numbers negative', function() {
        memory.setCurrentValue('3.14');
        spyOn(memory, 'setCurrentValue');
        interpreter.operation('reverse_sign');
        expect(memory.setCurrentValue).toHaveBeenCalledWith('-3.14');
      });
    });

    describe('equals', function() {
      it('should not alter the current value when no operation is present', function() {
        memory.setCurrentValue('5');
        spyOn(memory, 'setCurrentValue');
        interpreter.operation('equals');
        expect(memory.setCurrentValue).not.toHaveBeenCalled();
        expect(memory.currentValue).toBe('5');
      });

      it('after using equals, typing new keys should start a new value', function() {
        memory.setCurrentValue('5');
        spyOn(memory, 'setCurrentValue');
        interpreter.operation('equals');

        interpreter.entry('7');
        expect(memory.setCurrentValue).toHaveBeenCalledWith('7');
      });

      describe('there is a currentValue, a storedValue, and an operation stored on memory', function() {
        var $httpBackend;
        beforeEach(function() {
          $httpBackend = $injector.get('$httpBackend');
          memory.setCurrentValue('55.5');
          memory.setStoredValue('.5');
          memory.setOperation('add');
        });
        afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
        });

        it('makes a backend request', function() {
          $httpBackend.expectPOST(API_URL, {
            currentValue: '55.5',
            storedValue: '.5',
            operation: 'add'
          }).respond({
            result: '60'
          });
          interpreter.operation('equals');
          $httpBackend.flush();
        });

        it('sets currentValue to the result and calls clearAll() without arguments', function() {
          spyOn(memory, 'clearAll');
          spyOn(memory, 'setCurrentValue');
          $httpBackend.expectPOST(API_URL, {
            currentValue: '55.5',
            storedValue: '.5',
            operation: 'add'
          }).respond({
            result: '60'
          });
          interpreter.operation('equals');
          $httpBackend.flush();

          expect(memory.clearAll).toHaveBeenCalledWith();
          expect(memory.setCurrentValue).toHaveBeenCalledWith('60');
        });

        it('locks the interpreter after making a request and unlocks it when response is received', function() {
          $httpBackend.expectPOST(API_URL, {
            currentValue: '55.5',
            storedValue: '.5',
            operation: 'add'
          }).respond({
            result: '60'
          });
          interpreter.operation('equals');
          expect(interpreter.isLocked()).toBe(true);
          $httpBackend.flush();
          expect(interpreter.isLocked()).toBe(false);
        });

        it('repeats the last operation on the currentValue if equal is pressed again', function() {
          $httpBackend.expectPOST(API_URL, {
            currentValue: '55.5',
            storedValue: '.5',
            operation: 'add'
          }).respond({
            result: '60'
          });
          interpreter.operation('equals');
          $httpBackend.flush();

          interpreter.operation('equals');
          $httpBackend.expectPOST(API_URL, {
            currentValue: '55.5',
            storedValue: '60',
            operation: 'add'
          }).respond({
            result: '115.5'
          });

          $httpBackend.flush();
        });

        it('repeats the last operation on the currentValue even if it was changed by a new entry', function() {
          $httpBackend.expectPOST(API_URL, {
            currentValue: '55.5',
            storedValue: '.5',
            operation: 'add'
          }).respond({
            result: '60'
          });
          interpreter.operation('equals');
          $httpBackend.flush();

          interpreter.entry('9');
          interpreter.operation('equals');

          $httpBackend.expectPOST(API_URL, {
            currentValue: '55.5',
            storedValue: '9',
            operation: 'add'
          }).respond({
            result: '64.5'
          });

          $httpBackend.flush();
        });

        it('repeats the last operation on the currentValue even if a `clear` op was invoked on the currentValue', function() {
          $httpBackend.expectPOST(API_URL, {
            currentValue: '55.5',
            storedValue: '.5',
            operation: 'add'
          }).respond({
            result: '60'
          });
          interpreter.operation('equals');
          $httpBackend.flush();

          interpreter.operation('clear');
          interpreter.operation('equals');
          $httpBackend.expectPOST(API_URL, {
            currentValue: '55.5',
            storedValue: '0',
            operation: 'add'
          }).respond({
            result: '55.5'
          });
          $httpBackend.flush();
        });

        it('does not repeat the last operation on the currentValue even if a `all_clear` op was invoked on the currentValue', function() {
          $httpBackend.expectPOST(API_URL, {
            currentValue: '55.5',
            storedValue: '.5',
            operation: 'add'
          }).respond({
            result: '60'
          });
          interpreter.operation('equals');
          $httpBackend.flush();

          interpreter.operation('all_clear');
          interpreter.operation('equals');

          $httpBackend.verifyNoOutstandingRequest();
        });
      });

    });
  });
});