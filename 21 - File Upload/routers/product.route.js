var express = require('express');

var controller = require('../controllers/product.controller');
var pagination = require('../middlewares/pagination.middleware');

var route = express.Router();

route.get('/', pagination.createPagination, controller.index);

module.exports = route;