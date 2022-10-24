const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserOTPVerificationForgetPassword = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        otp: { type: String, required: true },
        expireAt: { type: Date, default: Date.now(), expires: 90 },
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
