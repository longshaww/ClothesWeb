const mongoose = require('mongoose');
const Types = require('./Types');
const Collections = require('./Collections');
const { Schema } = mongoose;
const Products = new mongoose.Schema(
    {
        nameProduct:  { type: Schema.Types.String, required: true },
        size:   { type: Schema.Types.Array, required: true },
        price: { type: Schema.Types.Number, required: true },
        description: {
            imageList: { type: Schema.Types.Array, required: true },
            productDes: { type: Schema.Types.String, required: true },
            price: { type: Schema.Types.String, required: true }, // Number
            collection: {
                type: Schema.Types.ObjectId,
                required: true ,
                ref: 'Collections',
            },
        },
        isForReward: { type: Schema.Types.Boolean, default: false },
        buyed: { type: Schema.Types.Number, default: 0, required : true },
    },
    {
        timestamps: true,
        collection: 'Products',
        versionKey: false,
    }
);

module.exports = mongoose.model('Products', Products);
