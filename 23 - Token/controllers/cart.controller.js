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
    
    var count = db.get('sessions')
    .find({id : currentSessionId})
    .get("carts." + idItem , 0)
    .value();

    db.get('sessions')
    .find({id : currentSessionId})
    .set("carts." + idItem,  count + 1)
    .write();

    res.redirect('/products?page=' + req.params.currentPage);
}

module.exports.countCartItems = function (req, res, next) {
    
    var cartsObj = db.get('sessions')
    .find({id : req.signedCookies.sessionId})
    .get('carts').value();

    var cartItems = 0;
    for (let item in cartsObj) {
        cartItems += cartsObj[item];
    }

    res.locals.cartItems = cartItems;
    next();
}
