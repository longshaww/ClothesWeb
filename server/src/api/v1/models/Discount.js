const mongoose = require('mongoose');

const Discount = new mongoose.Schema(
    {
        percent: { type: Number, required: true },
        dateStart: { type: Date, required: true },
        dateEnd: { type: Date, required: true },
    },
    {
        timestamps: true,
        collection: 'Discount',
        versionKey: false,
    }
);

module.exports = mongoose.model('Discount', Discount);
