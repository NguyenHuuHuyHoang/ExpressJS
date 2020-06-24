var express = require('express');
var multer = require('multer');

var validate = require('../validate/user.validate')
var controller = require('../controllers/user.controller');
var authMiddleware = require('../middlewares/auth.middleware');

var route = express.Router();

var upload = multer({ dest: './public/uploads/' })

route.get('/', authMiddleware.requireAuth, controller.index); //Thằng authMiddleware.requireAuth sẽ được chạy trước khi vào index

route.get('/cookie', function(req,res,next){
    res.cookie('user-id', 12345);
    res.send('Hello');
})

route.get('/search', controller.search);

route.get('/create', controller.create);

route.get('/:id', controller.view);

route.post('/create',
 upload.single('avatar'),
 validate.postCreate , 
 controller.postCreate);

module.exports = route;