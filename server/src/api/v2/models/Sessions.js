const mongoose = require('mongoose');
const Products = require('./Product');
const { Schema } = mongoose;

const Sessions = new Schema(
    {
        cart: [
            {
                idProduct: { type: Schema.Types.ObjectId, ref: 'Products' },
                img: String,
                name: String,
                qty: Number,
                size: String,
                total: Number,
                price: Number,
            },
        ],
        expireAt: { type: Date, default: Date.now(), expires: '1d' },
    },
    {
        timestamps: true,
        collection: 'Sessions',
        versionKey: false,
    }
);

module.exports = mongoose.model('Sessions', Sessions);
