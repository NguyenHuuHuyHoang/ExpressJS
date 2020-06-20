var db = require('../db');

var dataGetFromFile = db.get('products').value();



module.exports.index = function (req, res) { //Do route.get('/) là thư mục root nên đặt index
var page = parseInt(req.query.page) || 1;

var perPage = 8;
var maxPage = Math.ceil(dataGetFromFile.length / perPage);
var pagination = [];

var pageLeft = maxPage - page;

switch (page % 2) {
    case 0: 
    {
        pagination.push(page - 1);
        pagination.push(page);
        if (pageLeft) {
            pagination.push(page + 1);
        } else {
            pagination.push(0);
        }
    }
    break;
    default: 
    {
        switch (page % 3) {
            case 0:
                {
                    for (var i = 2; i >= 0; i--) {
                        pagination.push(page - i);
                    }
                }
                break;
                default: 
                {
                    pagination.push(page);
                    if (pageLeft >= 1) {
                        pagination.push(page + 1);
                        if (pageLeft >= 2) {
                            pagination.push(page + 2);
                        } else {
                            pagination.push(0);
                        }
                    }
                }
        }
    }
}

var begin = (page - 1) * perPage;
var end = perPage * page;

    res.render('products/index', {
        currentPage : page,
        maxPage : maxPage,
        pagination: pagination,
        // products: dataGetFromFile.slice(begin,end)
        products: db.get('products').drop(begin).take(perPage).value() //Do lowdb là thư viện xây dựng trên lodash, lodash có drop và take
        // products: dataGetFromFile.slice(0,8)
    });
};