require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routers/user.route');
var authRoute = require('./routers/auth.route');

var authMiddleware = require ('./middlewares/auth.middleware');

var port = 3000;

// var users = [  //Bỏ đi vì muốn đọc data từ db ra
//     { id: 1, name: 'Thinh' },
//     { id: 2, name: 'Hung' }
// ];



app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Khai báo đường dẫn folder static public
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', {
        name: 'AAA'
    });
});



app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}`));
