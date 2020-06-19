var express = require('express');
var app = express();
var port = 3000;

var users = [
    { id: 1, name: 'Thinh' },
    { id: 2, name: 'Hung' }
];

var inputSearch = '';

app.set('view engine', 'pug');
app.set('views', './views');


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
        users: users
    });
});

app.get('/users/search', function(req, res){
    var q = req.query.q;
    
    var matchedUsers = users.filter(function(user) {
        return user.name.indexOf(q) !== -1;
    });

    res.render('users/index', {
        inputSearch: q,
        users: matchedUsers
    });
    // console.log(req.query); //http://localhost:3000/users/search?q=1231423 => server nhận là 1 object có key = q và value = 'th'. http://localhost:3000/users/search?q=1231423&ten=eqeqw => server nhận 1 obj { q: '1231423', ten: 'eqeqw' }
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
