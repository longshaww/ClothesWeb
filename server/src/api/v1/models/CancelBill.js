const mongoose = require('mongoose');
const { Schema } = mongoose;
const CancelBills = new mongoose.Schema(
    {
        billID: { type: Schema.Types.ObjectId, ref: 'BillWeb' },
        reason: { type: String },
        moneyStatus: {
            type: String,
            required: true,
            enum: ['REFUNDS', 'NEED_REFUNDS', 'NO_REFUNDS'],
        },
    },
    {
        timestamps: true,
        collection: 'CancelBills',
        versionKey: false,
    }
);

module.exports = mongoose.model('CancelBills', CancelBills);
