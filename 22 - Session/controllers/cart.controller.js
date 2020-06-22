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
    var dataCurrentSessionStored = db.get('sessionId').find({idItem : sessionId});


}