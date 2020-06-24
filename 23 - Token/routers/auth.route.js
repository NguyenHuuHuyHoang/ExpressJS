var express = require('express');

var controller = require('../controllers/auth.controller');

var route = express.Router();
route.get('/login', controller.login);

route.post('/login', controller.postLogin);

module.exports = route;