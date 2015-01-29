'use strict';

var express = require('express');
var controller = require('./calculate.controller.js');

var router = express.Router();

router.post('/', controller.index);

module.exports = router;