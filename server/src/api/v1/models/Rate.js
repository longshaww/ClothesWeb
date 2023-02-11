const mongoose = require('mongoose');
const { Schema } = mongoose;

const Rates = new mongoose.Schema(
    {
        productID: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
        userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        rate: { type: Schema.Types.Number, enum: [1, 2, 3, 4, 5], required: true },
        content: { type: Schema.Types.String, required: true },
    },
    {
        timestamps: true,
        collection: 'Rates',
        versionKey: false,
    }
);

module.exports = mongoose.model('Rates', Rates);
