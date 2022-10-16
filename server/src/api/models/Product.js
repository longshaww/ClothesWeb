const mongoose = require('mongoose');
const Types = require('./Types');
const Collections = require('./Collections');
const { Schema } = mongoose;
const Products = new mongoose.Schema(
    {
        nameProduct: String,
        size: Array,
        price: Number,
        description: {
            imageList: Array,
            productDes: String,
            price: Number, // Number
            collection: {
                type: Schema.Types.ObjectId,
                ref: 'Collections',
            },
        },
        label: { type: String, default: 'New' },
        buyed: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        collection: 'Products',
        versionKey: false,
    }
);

module.exports = mongoose.model('Products', Products);
