var express = require('express');

var validate = require('../validate/user.validate')
var controller = require('../controllers/user.controller');

var route = express.Router();

route.get('/', controller.index);

route.get('/cookie', function(req,res,next){
    res.cookie('user-id', 12345);
    res.send('Hello');
})

route.get('/search', controller.search);

route.get('/create', controller.create);

route.get('/:id', controller.view);

route.post('/create', validate.postCreate , controller.postCreate);

module.exports = route;