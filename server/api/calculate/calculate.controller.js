'use strict';
var operationMap = require('./operationMap.js');
var Big = require('big.js');

exports.index = function(req, res) {
  /*
  req should look like:
  {
    operation: {
      type: 'string',
      required: true,
    }
    currentValue: {
      type: 'string', //containing number
      required: true
    },
    storedValue: {
      type: 'string', //containing number
    }
  }
   */
  var operation = req.body.operation,
      currentValue = req.body.currentValue,
      storedValue = req.body.storedValue;

  if (isValidRequest()) {
    currentValue = new Big(currentValue);
    if (isPresent(storedValue)) {
      storedValue = new Big(storedValue);
    }
    switch (operation) {
      case 'add':
        return okResponse(storedValue.plus(currentValue));
      case 'subtract':
        return okResponse(storedValue.minus(currentValue));
      case 'multiply':
        return okResponse(storedValue.times(currentValue));
      case 'divide':
        return okResponse(storedValue.div(currentValue));
      case 'percentage':
        if (storedValue instanceof Big) {
          return okResponse( (storedValue.div(new Big(100))).times(currentValue) );
        }
        else {
          return okResponse( currentValue.div(new Big(100)) );
        }
        break;
      default:
        return invalidRequestResponse();
    }
  }
  else {
    return invalidRequestResponse();
  }

  function okResponse(bignum) {
    res.json({result: bignum.toString()});
  }
  function invalidRequestResponse() {
    res.json({error: 'invalid_request'});
  }

  function isValidRequest() {
    return isPresent(operation) &&
           isPresent(currentValue) &&
           operation in operationMap &&
      (operationMap[operation].unary || isPresent(storedValue));
  }
  function isPresent(value) {
    return typeof value === 'string' && value !== '';
  }
};