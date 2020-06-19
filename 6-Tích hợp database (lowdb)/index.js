var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync'); //Thường sử dụng ASync vì sẽ ảnh hưởng tới hiệu năng, blocking && non-blocking
var adapter = new FileSync('db.json'); //Lưu dữ liệu trong file db.json trong cùng thư mục

db = low(adapter); //Tạo một object mới có tên là db để truy xuất dữ liệu.

db.defaults({ users: [] }) //Setting file mặc định trong trường hợp chưa có file nào.
    .write();


var port = 3000;

// var users = [  //Bỏ đi vì muốn đọc data từ db ra
//     { id: 1, name: 'Thinh' },
//     { id: 2, name: 'Hung' }
// ];

var dataGetFromFile = db.get('users').value();
var inputSearch = '';

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/', function (req, res) {
    // res.send('Hello Coder Tokyo');
    // res.render('index');
    res.render('index', {
        name: 'AAA'
    });
});

app.get('/users', function (req, res) {
    // res.send('Hello Coder Tokyo');
    res.render('users/index', {
        inputSearch: inputSearch,
       users: dataGetFromFile //db.get(key) sẽ trả về value đã lưu của key đó
    });
});

app.get('/users/search', function (req, res) {
    var q = req.query.q;

    var matchedUsers = dataGetFromFile.filter(function (user) {
        return user.name.indexOf(q) !== -1;
    });

    res.render('users/index', {
        inputSearch: q,
        users: matchedUsers
    });
    // console.log(req.query); //http://localhost:3000/users/search?q=1231423 => server nhận là 1 object có key = q và value = 'th'. http://localhost:3000/users/search?q=1231423&ten=eqeqw => server nhận 1 obj { q: '1231423', ten: 'eqeqw' }
});

app.get('/users/create', function (req, res) {
    res.render('users/create');
});

app.post('/users/create', function (req, res) {
   db.get('users')
   .push(req.body).write();
    res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
