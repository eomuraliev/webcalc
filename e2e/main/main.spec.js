'use strict';

describe('Calculator', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should show \'0\' at the start', function() {
    expect(page.screen.getText()).toBe('0');
  });

  it('should show \'1\' when the `1` clicked', function() {
    page.keys.one.click();
    expect(page.screen.getText()).toBe('1');
  });

  it('should show `10` when `5 + 5 =` is keyed in', function() {
    page.keys.five.click();
    page.keys.plus.click();
    page.keys.five.click();
    page.keys.equals.click();
    expect(page.screen.getText()).toBe('10');
  });

  it('should show `5` when `2.5 + 2.5 =` is keyed in', function() {
    page.keys.two.click();
    page.keys.point.click();
    page.keys.five.click();
    page.keys.plus.click();
    page.keys.two.click();
    page.keys.point.click();
    page.keys.five.click();
    page.keys.equals.click();
    expect(page.screen.getText()).toBe('5');
  });

  it('should show `25` when `5 * 5 =` is keyed in', function() {
    page.keys.five.click();
    page.keys.times.click();
    page.keys.five.click();
    page.keys.equals.click();
    expect(page.screen.getText()).toBe('25');
  });

  it('should show `8.33333333` when `5 * 5 / 3 =` is keyed in', function() {
    page.keys.five.click();
    page.keys.times.click();
    page.keys.five.click();
    page.keys.divide.click();
    page.keys.three.click();
    page.keys.equals.click();
    expect(page.screen.getText()).toBe('8.33333333');
  });

  it('should show `-8.33333333` when `5 * 5 / -3 =` is keyed in', function() {
    page.keys.five.click();
    page.keys.times.click();
    page.keys.five.click();
    page.keys.divide.click();
    page.keys.reverse.click();
    page.keys.three.click();
    page.keys.equals.click();
    expect(page.screen.getText()).toBe('-8.33333333');
  });

  it('should show `0.75` when `5 * 5 + % 3` is keyed in', function() {
    page.keys.five.click();
    page.keys.times.click();
    page.keys.five.click();
    page.keys.plus.click();
    page.keys.three.click();
    page.keys.percentage.click();
    expect(page.screen.getText()).toBe('0.75');
  });

  it('should show `25.75` when `5 * 5 + % 3 =` is keyed in', function() {
    page.keys.five.click();
    page.keys.times.click();
    page.keys.five.click();
    page.keys.plus.click();
    page.keys.three.click();
    page.keys.percentage.click();
    page.keys.equals.click();
    expect(page.screen.getText()).toBe('25.75');
  });

  it('should show `-3` when `5 * 5 + % 3 = CLEAR CLEAR + 3 =` is keyed in', function() {
    page.keys.five.click();
    page.keys.times.click();
    page.keys.five.click();
    page.keys.plus.click();
    page.keys.three.click();
    page.keys.percentage.click();
    page.keys.equals.click();
    expect(page.screen.getText()).toBe('25.75');
    expect(page.keys.clear.getText()).toBe('C');
    page.keys.clear.click();
    expect(page.keys.clear.getText()).toBe('AC');
    page.keys.clear.click();
    expect(page.screen.getText()).toBe('0');
    page.keys.plus.click();
    page.keys.three.click();
    page.keys.equals.click();
    page.keys.reverse.click();
    expect(page.screen.getText()).toBe('-3');
  });

  describe('when using equals `=`', function() {
    it('should show `15` when `5 + 5 = =` is keyed in', function() {
      page.keys.five.click();
      page.keys.plus.click();
      page.keys.five.click();
      page.keys.equals.click();
      page.keys.equals.click();
      expect(page.screen.getText()).toBe('15');
    });

    it('should show `5` when `5 + 5 = CLEAR =` is keyed in', function() {
      page.keys.five.click();
      page.keys.plus.click();
      page.keys.five.click();
      page.keys.equals.click();
      page.keys.clear.click();
      page.keys.equals.click();
      expect(page.screen.getText()).toBe('5');
    });

    it('should show `0` when `5 + 5 = CLEAR CLEAR =` is keyed in', function() {
      page.keys.five.click();
      page.keys.plus.click();
      page.keys.five.click();
      page.keys.equals.click();
      page.keys.clear.click();
      page.keys.clear.click();
      page.keys.equals.click();
      expect(page.screen.getText()).toBe('0');
    });

    it('after using `=` typing keys should start a new value', function() {
      page.keys.five.click();
      page.keys.plus.click();
      page.keys.five.click();
      page.keys.equals.click();
      page.keys.three.click();
      page.keys.eight.click();
      expect(page.screen.getText()).toBe('38');
    });
  });

});
