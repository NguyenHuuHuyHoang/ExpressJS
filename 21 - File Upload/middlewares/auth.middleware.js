var db = require ('../db');

module.exports.requireAuth = function (req, res, next) {
    if (!req.signedCookies.usersId) {
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({id: req.signedCookies.usersId}).value();
    console.log(user);
    if (!user) {
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = user;

    next();
};