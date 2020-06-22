var db = require('../db');



module.exports.checkSessionId = function(req, res, next ) {
    if (!req.signedCookies.sessionId){
        res.redirect('/products');
    }
    next();
}

module.exports.addCart = function(req, res) {
    //Get idItem from request
    var idItem = req.params.productId;
    var currentSessionId = req.signedCookies.sessionId;
    //Check idItem in sessionItem stored.

    var count = db.get('sessions')
    .find({id : currentSessionId})
    .get("cart." + idItem , 0)
    .value();

    db.get('sessions')
    .find({id : currentSessionId})
    .set("cart." + idItem,  count + 1)
    .write();

    res.redirect('/products');
}