const mongoose = require('mongoose');
const { Schema } = mongoose;

const Rates = new mongoose.Schema(
    {
        productID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        userID: { type: Schema.Types.ObjectId, ref: 'UserWeb', required: true },
        rate: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'Rates',
        versionKey: false,
    }
);

module.exports = mongoose.model('Rates', Rates);
