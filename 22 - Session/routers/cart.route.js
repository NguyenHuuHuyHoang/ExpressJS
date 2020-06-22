var express = require('express');
var route = express.Router();

var controller = require('../controllers/cart.controller');

route.get('/',)

route.get('/addCart/:productId/:currentPage', controller.checkSessionId, controller.addCart);

module.exports = route;