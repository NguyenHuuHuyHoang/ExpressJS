var shortId = require('shortId');
var md5 = require('md5');


var User = require('../models/user.model');


var inputSearch = '';

//Bình thường có thể export ra một hàm hoặc một object vì exports là một obj
module.exports.index = async function (req, res) { //Do route.get('/) là thư mục root nên đặt index
    res.render('users/index', {
        inputSearch: inputSearch,
        users: await User.find()
    });
};

module.exports.search = async function (req, res) {
    var q = req.query.q;

    var dataOfUsers = await User.find();

    filterUserByName = () => {
       return dataOfUsers.filter( (user) =>{
            return user.name.search(q) !== -1;
        })
    }

    var matchedUsers = q ? filterUserByName() : await User.find();

    res.render('users/index', {
        inputSearch: q,
        users: matchedUsers
    });
    // console.log(req.query); //http://localhost:3000/search?q=1231423 => server nhận là 1 object có key = q và value = 'th'. http://localhost:3000/search?q=1231423&ten=eqeqw => server nhận 1 obj { q: '1231423', ten: 'eqeqw' }
};

module.exports.create = function (req, res) {
    res.render('users/create', {
        csrfToken: req.csrfToken()
    });
};

module.exports.view = async function (req, res) {
    var id = req.params.id;
    var user = await User.findById(id);
    res.render('users/view', {
        user : user
    });
};

module.exports.postCreate = function (req, res) {

    req.body.password = md5(req.body.password);
    req.body.avatar = req.file.path.split("\\").slice(1).join('/');
    // db.get('users').push(req.body).write();
    new User(req.body).save();
    res.redirect('/users');
};