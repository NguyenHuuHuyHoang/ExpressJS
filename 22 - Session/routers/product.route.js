var express = require('express');

var controller = require('../controllers/product.controller');
var pagination = require('../middlewares/pagination.middleware');
var cart = require('../controllers/cart.controller');

var route = express.Router();

route.get('/',cart.countCartItems, pagination.createPagination, controller.index);

module.exports = route;