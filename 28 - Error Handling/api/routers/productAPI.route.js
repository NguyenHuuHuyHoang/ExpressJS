var express = require('express');

var controller = require('../../api/controller/productAPI.controller');

var route = express.Router();

route.get('/', controller.index);
route.post('/', controller.create);
route.put('/:productId', controller.updatePUT);
route.patch('/:productId', controller.updatePATCH);
route.delete('/:productId', controller.delete);


module.exports = route;