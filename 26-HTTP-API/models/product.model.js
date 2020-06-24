var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    image: String,
    description: String,
    name: String,
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product