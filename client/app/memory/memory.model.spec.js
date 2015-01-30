'use strict';

describe('memory model', function() {
  var memory,
      $injector;

  beforeEach(module('CalculatorApp'));
  beforeEach(inject(function(_$injector_) {
    $injector = _$injector_;
    memory = $injector.get('memory');
  }));


  it('The initial memory attributes be zero and undefined', function() {
    expect(memory.currentValue).toBe('0');
    expect(memory.storedValue).toBeUndefined();
    expect(memory.operation).toBeUndefined();
    expect(memory.lastEqualsAction).toBeUndefined();
    expect(memory.error).toBe(false);
  });

  describe('setCurrentValue', function() {
    it('trims values to 9 digits when assigned more than 9 digits', function() {
      memory.setCurrentValue('123456789111');
      expect(memory.currentValue).toBe('123456789');
    });

    it('when trimming assigned values does not count the dot', function() {
      memory.setCurrentValue('1.23456789111');
      expect(memory.currentValue).toBe('1.23456789');
    });

    it('does not trim values less than 9 digits long', function() {
      memory.setCurrentValue('1.234567');
      expect(memory.currentValue).toBe('1.234567');
    });

    it('does not trim values exactly 9 digits long', function() {
      memory.setCurrentValue('1.23456789');
      expect(memory.currentValue).toBe('1.23456789');
    });
  });

  describe('setStoredValue', function() {
    it('does not modify values passed in', function () {
      memory.setStoredValue('123456789111');
      expect(memory.storedValue).toBe('123456789111');
    });

    it('does not modify values passed in with a dot', function() {
      memory.setStoredValue('1.23456789111');
      expect(memory.storedValue).toBe('1.23456789111');
    });
  });

  describe('hasStoredValue', function() {
    it('returns false when no value is assigned', function () {
      expect(memory.hasStoredValue()).toBe(false);
    });

    it('does not modify values passed in with a dot', function() {
      memory.setStoredValue('1.23456789111');
      expect(memory.hasStoredValue()).toBe(true);
    });
  });

  describe('setOperation', function() {
    it('does not modify the operation passed in', function () {
      memory.setOperation('add');
      expect(memory.operation).toBe('add');
    });
  });

  describe('hasOperation', function() {
    it('returns false when no value is assigned', function () {
      expect(memory.hasOperation()).toBe(false);
    });

    it('does not modify values passed in with a dot', function() {
      memory.setOperation('add');
      expect(memory.hasOperation()).toBe(true);
    });
  });

  describe('clearCurrentValue', function() {
    it('clears the currentValue and error', function () {
      memory.setCurrentValue('55');
      memory.error = true;
      memory.clearCurrentValue();
      expect(memory.currentValue).toBe('0');
      expect(memory.error).toBe(false);
    });

    it('does not clear the storedValue, operation, and lastEqualsAction', function () {
      var lastEqualsAction = {
        value: '1',
        operation: 'add'
      };
      memory.setStoredValue('55');
      memory.setOperation('divide');
      memory.lastEqualsAction = lastEqualsAction;
      memory.clearCurrentValue();
      expect(memory.storedValue).toBe('55');
      expect(memory.operation).toBe('divide');
      expect(memory.lastEqualsAction).toBe(lastEqualsAction);
    });
  });

  describe('clearAll', function() {
    var lastEqualsAction = {
      value: '1',
      operation: 'add'
    };

    beforeEach(function(){
      memory.setCurrentValue('55');
      memory.error = true;
      memory.setStoredValue('55');
      memory.setOperation('divide');
      memory.lastEqualsAction = lastEqualsAction;
    });

    it('when passed true clears: currentValue, error, storedValue, and operation', function () {
      memory.clearAll();
      expect(memory.currentValue).toBe('0');
      expect(memory.error).toBe(false);
      expect(memory.storedValue).toBeUndefined();
      expect(memory.operation).toBeUndefined();
      expect(memory.lastEqualsAction).toBe(lastEqualsAction);
    });

    it('when passed true also clears lastEqualsAction', function () {
      memory.clearAll(true);
      expect(memory.currentValue).toBe('0');
      expect(memory.error).toBe(false);
      expect(memory.storedValue).toBeUndefined();
      expect(memory.operation).toBeUndefined();
      expect(memory.lastEqualsAction).toBeUndefined();
    });
  });
});