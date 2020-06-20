var express = require('express');


var controller = require('../controllers/user.controller');

var route = express.Router();

route.get('/', controller.index);

route.get('/search', controller.search);

route.get('/create', controller.create);

route.get('/:id', controller.view);

route.post('/create', controller.postCreate);

module.exports = route;