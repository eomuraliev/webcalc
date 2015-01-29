/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.calculator = element(by.css('.calculator'));
  this.screen = this.calculator.element(by.css('.screen'));
  this.keys = {
    one: this.calculator.element(by.css('key[value="1"]')),
    two: this.calculator.element(by.css('key[value="2"]')),
    three: this.calculator.element(by.css('key[value="3"]')),
    four: this.calculator.element(by.css('key[value="4"]')),
    five: this.calculator.element(by.css('key[value="5"]')),
    six: this.calculator.element(by.css('key[value="6"]')),
    seven: this.calculator.element(by.css('key[value="7"]')),
    eight: this.calculator.element(by.css('key[value="8"]')),
    nine: this.calculator.element(by.css('key[value="9"]')),
    zero: this.calculator.element(by.css('key[value="0"]')),
    plus: this.calculator.element(by.css('key[value="add"]')),
    minus: this.calculator.element(by.css('key[value="subtract"]')),
    times: this.calculator.element(by.css('key[value="multiply"]')),
    divide: this.calculator.element(by.css('key[value="divide"]')),
    percentage: this.calculator.element(by.css('key[value="percentage"]')),
    reverse: this.calculator.element(by.css('key[value="reverse_sign"]')),
    equals: this.calculator.element(by.css('key[value="equals"]')),
    clear: this.calculator.element(by.css('key.clear'))
  };
};

module.exports = new MainPage();

