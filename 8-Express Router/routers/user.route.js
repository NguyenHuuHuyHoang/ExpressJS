var express = require('express');
var shortId = require('shortId');

var db = require('../db');

var route = express.Router();

var dataGetFromFile = db.get('users').value();
var inputSearch = '';

route.get('/', function (req, res) {
    // res.send('Hello Coder Tokyo');
    res.render('users/index', {
        inputSearch: inputSearch,
        users: dataGetFromFile //db.get(key) sẽ trả về value đã lưu của key đó
    });
});

route.get('/search', function (req, res) {
    var q = req.query.q;

    var matchedUsers = dataGetFromFile.filter(function (user) {
        return user.name.indexOf(q) !== -1;
    });

    res.render('users/index', {
        inputSearch: q,
        users: matchedUsers
    });
    // console.log(req.query); //http://localhost:3000/search?q=1231423 => server nhận là 1 object có key = q và value = 'th'. http://localhost:3000/search?q=1231423&ten=eqeqw => server nhận 1 obj { q: '1231423', ten: 'eqeqw' }
});

route.get('/create', function (req, res) {
    res.render('users/create');
});

route.get('/:id', function (req, res) {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user : user
    });
});

route.post('/create', function (req, res) {
    req.body.id = shortId.generate();
    db.get('users')
        .push(req.body).write();
    res.redirect('/users');
});

module.exports = route;