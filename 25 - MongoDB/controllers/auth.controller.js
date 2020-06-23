var User = require('../models/user.model');
var md5 = require('md5');


var inputSearch = '';

//Bình thường có thể export ra một hàm hoặc một object vì exports là một obj
module.exports.login = async function (req, res) { //Do route.get('/) là thư mục root nên đặt index
    res.render('auth/login', {
        inputSearch: inputSearch,
        users: await User.find() //db.get(key) sẽ trả về value đã lưu của key đó
    });
};

module.exports.postLogin = async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var user = await User.find({email: email});
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
    res.cookie('usersId', user.id, {
        signed: true
    });
    res.redirect('/users');
};