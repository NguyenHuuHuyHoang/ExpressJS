var db = require('../db');
var md5 = require('md5');

var dataGetFromFile = db.get('users').value();
var inputSearch = '';

//Bình thường có thể export ra một hàm hoặc một object vì exports là một obj
module.exports.login = function (req, res) { //Do route.get('/) là thư mục root nên đặt index
    res.render('auth/login', {
        inputSearch: inputSearch,
        users: dataGetFromFile //db.get(key) sẽ trả về value đã lưu của key đó
    });
};

module.exports.postLogin = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('users').find({email: email}).value();
    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist.'
            ]
        });
        return;
    }

    var hashedPassword = md5(password);

    if (user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password'
            ]
        });
        return;
    }
    res.cookie('usersId', user.id);
    res.redirect('/users');
};