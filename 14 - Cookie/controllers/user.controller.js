var db = require('../db');
var shortId = require('shortId');

var dataGetFromFile = db.get('users').value();
var inputSearch = '';

//Bình thường có thể export ra một hàm hoặc một object vì exports là một obj
module.exports.index = function (req, res) { //Do route.get('/) là thư mục root nên đặt index
    res.render('users/index', {
        inputSearch: inputSearch,
        users: dataGetFromFile //db.get(key) sẽ trả về value đã lưu của key đó
    });
};

module.exports.search = function (req, res) {
    var q = req.query.q;

    var matchedUsers = dataGetFromFile.filter(function (user) {
        return user.name.indexOf(q) !== -1;
    });

    res.render('users/index', {
        inputSearch: q,
        users: matchedUsers
    });
    // console.log(req.query); //http://localhost:3000/search?q=1231423 => server nhận là 1 object có key = q và value = 'th'. http://localhost:3000/search?q=1231423&ten=eqeqw => server nhận 1 obj { q: '1231423', ten: 'eqeqw' }
};

module.exports.create = function (req, res) {
    console.log(req.cookies);
    res.render('users/create');
};

module.exports.view = function (req, res) {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user : user
    });
};

module.exports.postCreate = function (req, res) {
    console.log(res.locals);
    req.body.id = shortId.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};