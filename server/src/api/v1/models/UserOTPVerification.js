const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserOTPVerification = new mongoose.Schema(
    {
        userId: { type: Schema.Types.String, required: true },
        otp: { type: Schema.Types.String, required: true },
        expiresAt: { type: Schema.Types.Date, required: true },
    },
    {
        timestamps: true,
        collection: 'UserOTPVerification',
        versionKey: false,
    }
);
module.exports = mongoose.model('UserOTPVerification', UserOTPVerification);
