const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserOTPVerificationForgetPassword = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        otp: { type: String, required: true },
        expireAt: { type: Date, default: Date.now(), expires: 180 },
        step: { type: Number, default: 1, required: true, enum: [1, 2] },
    },
    {
        timestamps: true,
        collection: 'UserOTPVerificationForgetPassword',
        versionKey: false,
    }
);
module.exports = mongoose.model(
    'UserOTPVerificationForgetPassword',
    UserOTPVerificationForgetPassword
);
