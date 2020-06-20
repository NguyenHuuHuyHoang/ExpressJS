var db = require ('../db');

module.exports.requireAuth = function (req, res, next) {
    console.log(req.cookies);
    if (!req.cookies.usersId) {
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({id: req.cookies.usersId}).value();
    console.log(user);
    if (!user) {
        res.redirect('/auth/login');
        return;
    }

    next();
};