const mongoose = require('mongoose');
const Products = require('./Product');
const { Schema } = mongoose;

const Sessions = new Schema(
    {
        cart: [
            {
                idProduct: { type: Schema.Types.ObjectId, ref: 'Products' },
                img: { type: Schema.Types.String },
                name: { type: Schema.Types.String, required: true },
                qty: { type: Schema.Types.Number, required: true },
                size: { type: Schema.Types.String, required: true },
                total: { type: Schema.Types.Number, required: true },
                price: { type: Schema.Types.Number, required: true },
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
