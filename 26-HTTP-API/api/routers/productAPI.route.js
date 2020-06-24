var express = require('express');

var controller = require('../../api/controller/productAPI.controller');

var route = express.Router();

route.get('/', controller.index);

module.exports = route;