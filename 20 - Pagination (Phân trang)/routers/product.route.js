var express = require('express');

var controller = require('../controllers/product.controller');

var route = express.Router();

route.get('/', controller.index);

module.exports = route;