var Product = require('../models/product.model');

module.exports.index = async function (req, res) { //Do route.get('/) là thư mục root nên đặt index
// var page = parseInt(req.query.page) || 1;

// var itemsPerPage = 8;
// var maxPage = Math.ceil(dataGetFromFile.length / itemsPerPage);
// var pagination = [];

// // var pagesRest = maxPage - page;
// // switch (page % 2) {
// //     case 0: 
// //     {
// //         pagination.push(page - 1);
// //         pagination.push(page);
// //         if (pagesRest) {
// //             pagination.push(page + 1);
// //         } else {
// //             pagination.push(0);
// //         }
// //     }
// //     break;
// //     default: 
// //     {
// //         switch (page % 3) {
// //             case 0:
// //                 {
// //                     for (var i = 2; i >= 0; i--) {
// //                         pagination.push(page - i);
// //                     }
// //                 }
// //                 break;
// //                 default: 
// //                 {
// //                     pagination.push(page);
// //                     if (pagesRest >= 1) {
// //                         pagination.push(page + 1);
// //                         if (pagesRest >= 2) {
// //                             pagination.push(page + 2);
// //                         } else {
// //                             pagination.push(0);
// //                         }
// //                     }
// //                 }
// //         }
// //     }
// // }

// switch (page) {
//     case 1: 
//         for (var i = 1; i <= 3; i++) {
//             pagination.push(i);
//         }
//     break;
//     case maxPage:
//         {
//             for (var i = 0; i<3; i++){
//                 pagination.push(page - i);
//             }
//             pagination.reverse();
//         }
//         break;
//         default:
//                 for (var i = -1; i < 2; i++) {
//                     pagination.push(page + i);
//                 }
// }
let {page, itemsPerPage, maxPage, pagination} =  res.locals.pagination;

var dataGetFromDB = await Product.find();
var begin = (page - 1) * itemsPerPage;
var end = itemsPerPage * page;

    res.render('products/index', {
        cartItems: res.locals.cartItems,
        currentPage : page,
        maxPage : maxPage,
        pagination: pagination,
        // products: dataGetFromFile.slice(begin,end)
        products: dataGetFromDB.slice(begin, end)
        // products: dataGetFromFile.slice(0,8)
    });
};