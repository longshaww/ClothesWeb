const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    nameProduct: String,
    size : Array,
    price : Number ,
    description : Object,
    discount: Object
});

module.exports = mongoose.model('products', Product);
