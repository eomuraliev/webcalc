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
  console.log(req.body);
  var operation = req.body.operation,
      currentValue = req.body.currentValue,
      storedValue = req.body.storedValue;

  if (isValidRequest()) {
    console.log('passed isValidRequest');
    currentValue = new Big(currentValue);
    if (isPresent(storedValue)) {
      storedValue = new Big(storedValue);
    }
    switch (operation) {
      case 'add':
        console.log('processing add');
        return okResponse(storedValue.plus(currentValue));
      case 'subtract':
        console.log('processing subtract');
        return okResponse(storedValue.minus(currentValue));
      case 'multiply':
        console.log('processing multiply');
        return okResponse(storedValue.times(currentValue));
      case 'divide':
        console.log('processing divide');
        return okResponse(storedValue.div(currentValue));
      case 'percentage':
        if (storedValue instanceof Big) {
          console.log('processing binary percentage');
          return okResponse( (storedValue.div(new Big(100))).times(currentValue) );
        }
        else {
          console.log('processing unary percentage');
          return okResponse( currentValue.div(new Big(100)) );
        }
        break;
      default:
        console.log('returning default error because no known op was detected');
        return invalidRequestResponse();
    }
  }
  else {
    console.log('failed isValidRequest');
    return invalidRequestResponse();
  }

  function okResponse(bignum) {
    res.json({result: bignum.toString()});
  }
  function invalidRequestResponse() {
    res.json({error: 'invalid_request'});
  }

  function isValidRequest() {
    console.log('isValidRequest: ', operation, currentValue, storedValue);
    console.log(operationMap);
    return isPresent(operation) &&
           isPresent(currentValue) &&
           operation in operationMap &&
      (operationMap[operation].unary || isPresent(storedValue));
  }
  function isPresent(value) {
    console.log(typeof value === 'string' && value !== '');
    return typeof value === 'string' && value !== '';
  }
};