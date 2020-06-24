var db = require('../db');
var shortId = require('shortId');

module.exports = function (req, res, next ){
    
    if (!req.signedCookies.sessionId) {
        var sessionId = shortId.generate();
        
        db.get('sessions')
        .push({
            "id": sessionId
        })
        .write();

        res.cookie('sessionId', sessionId, {
            signed: true
        });
    }

    next();
}