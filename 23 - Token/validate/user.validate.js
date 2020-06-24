module.exports.postCreate = function(req,res,next){
    var errors = [];
    
    if (!req.body.name.trim()) {
        errors.push('Name have to input');
    }

    if (!req.body.phone.trim()){
        errors.push('Phone have to input');
    }

    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        });
        return;
    }
    res.locals.success = true;
    next(); //Quên next thì trang sẽ load mãi mãi tới khi timeout sẽ báo lỗi
}