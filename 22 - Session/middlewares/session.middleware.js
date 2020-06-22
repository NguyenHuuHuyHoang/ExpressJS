var db = require('../db');
var shortId = require('shortId');

module.exports = function (req, res, next ){
    var sessionId = shortId.generate();
    if (!req.signedCookies.sessionId) {
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        db.get('sessionId')
        .push({
            id: sessionId
        })
        .write();

    }
    next();
}