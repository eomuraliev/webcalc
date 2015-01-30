'use strict';

describe('interpreter service', function() {
  var $injector,
      interpreter,
      memory;

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

  });
});