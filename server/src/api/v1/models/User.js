const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete');

const User = new mongoose.Schema(
    {
        email: { type: Schema.Types.String, required: true },
        password: { type: Schema.Types.String, required: true },
        information: {
            name: { type: Schema.Types.String, required: true },
            phoneNumber: { type: Schema.Types.String, required: true },
            dateOfBirth: Schema.Types.Date,
            gender: { type: Schema.Types.Boolean, required: true },
            address: { type: Schema.Types.String, required: true },
        },
        isAdmin: { type: Schema.Types.Boolean, required: true, default: false },
        role: { type: Schema.Types.Number, required: true, default: 2, enum: [0, 1, 2] },
        myPoint: { type: Schema.Types.Number, required: true, default: 0 },
        verify: { type: Schema.Types.Boolean, required: true, default: false },
        vip: {
            type: Schema.Types.String,
            required: true,
            default: 'Bronze',
            enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
        },
        moneyPayed: { type: Schema.Types.Number, required: true, default: 0 },
        listVoucher: [{ type: Schema.Types.ObjectId, ref: 'Vouchers' }],
    },
    {
        timestamps: true,
        collection: 'User',
        versionKey: false,
    }
);
User.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true,
});

module.exports = mongoose.model('User', User);
