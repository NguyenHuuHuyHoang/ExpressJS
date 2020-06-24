var Product = require('../../models/product.model');

module.exports.index = async function (req, res) {
    res.json(await Product.find());
};

module.exports.create = async function (req, res) {
    var product = await Product.create(req.body);
    res.json(product);
};

module.exports.updatePUT = async function (req, res) {
    var idItem = req.params.productId;
    if (!await Product.findById(idItem)) {
        var product = await Product.create(req.body);
        res.json(product);
    }
    await Product.where({_id : idItem}).update(req.body);
    res.json(await Product.findById(idItem));
};

module.exports.updatePATCH = async function (req, res) {
    var idItem = req.params.productId;
    await Product.where({_id : idItem}).update(req.body);
    res.json(await Product.findById(idItem));
}

module.exports.delete = async function (req, res) {
    var idItem = req.params.productId;
    await Product.findByIdAndDelete(idItem);
    res.json(await Product.findById(idItem));
};