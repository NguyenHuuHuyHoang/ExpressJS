var express = require('express');
var route = express.Router();

var controller = require('../controllers/cart.controller');


route.get('/addCard/:productId', controller.checkSessionId, controller.addCart);

module.exports = route;