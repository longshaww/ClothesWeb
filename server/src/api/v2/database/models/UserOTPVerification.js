const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserOTPVerification = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        otp: { type: String, required: true },
        expiresAt: { type: Date, required: true },
    },
    {
        timestamps: true,
        collection: 'UserOTPVerification',
        versionKey: false,
    }
);
module.exports = mongoose.model('UserOTPVerification', UserOTPVerification);
