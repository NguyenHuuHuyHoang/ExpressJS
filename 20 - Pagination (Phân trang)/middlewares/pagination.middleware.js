var db = require('../db');
var dataGetFromFile = db.get('products').value();

module.exports.createPagination = function (req, res, next) {
var page = parseInt(req.query.page) || 1;

var itemsPerPage = 8;
var maxPage = Math.ceil(dataGetFromFile.length / itemsPerPage);
var pagination = [];

// var pagesRest = maxPage - page;
// switch (page % 2) {
//     case 0: 
//     {
//         pagination.push(page - 1);
//         pagination.push(page);
//         if (pagesRest) {
//             pagination.push(page + 1);
//         } else {
//             pagination.push(0);
//         }
//     }
//     break;
//     default: 
//     {
//         switch (page % 3) {
//             case 0:
//                 {
//                     for (var i = 2; i >= 0; i--) {
//                         pagination.push(page - i);
//                     }
//                 }
//                 break;
//                 default: 
//                 {
//                     pagination.push(page);
//                     if (pagesRest >= 1) {
//                         pagination.push(page + 1);
//                         if (pagesRest >= 2) {
//                             pagination.push(page + 2);
//                         } else {
//                             pagination.push(0);
//                         }
//                     }
//                 }
//         }
//     }
// }

    switch (page) {
        case 1:
            for (var i = 1; i <= 3; i++) {
                pagination = [...pagination, i];
            }
            break;
        case maxPage:
            {
                for (var i = 0; i < 3; i++) {
                    pagination = [...pagination, page - i];
                }
                pagination.reverse();
            }
            break;
        default:
            for (var i = -1; i < 2; i++) {
                pagination = [...pagination, page + i];
            }
    }



    res.locals.pagination = {
        page,
        itemsPerPage,
        maxPage,
        pagination
    };
    next();
}