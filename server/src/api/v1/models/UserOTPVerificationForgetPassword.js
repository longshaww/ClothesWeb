const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserOTPVerificationForgetPassword = new mongoose.Schema(
    {
        userId: { type: Schema.Types.String, required: true },
        otp: { type: Schema.Types.String, required: true },
        expireAt: { type: Schema.Types.Date, default: Date.now(), expires: 3600 },
        step: { type: Schema.Types.Number, default: 1, required: true, enum: [1, 2] },
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
