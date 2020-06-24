var Product = require('../../models/product.model');

module.exports.index = async function (req, res) {
    res.json(await Product.find());
};