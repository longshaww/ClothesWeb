const ValidatorService = require('../../authenticator/index');
const User = require('../../../models/UserWeb');
const md5 = require('md5');
const nodemailer = require('nodemailer');
const { mailOptionsSendOTP } = require('../../../utils/mailer');
const UserOTPVerificationForgetPassword = require('../../../models/UserOTPVerificationForgetPassword');
class UserService {
    constructor(id) {
        this._id = id;
    }
    async changePassword(model) {
        model.currentStep = 'VALIDATE_CHANGE_PASSWORD';
        try {
            const validatorService = new ValidatorService();
            const flag = await validatorService.performValidation(model);
            if (!flag) {
                throw new Error('ERROR REQUEST DATA');
            }
            const newPassword = await this.getNewPasswordUser(model);
            return User.updateOne(
                { _id: this._id },
                {
                    $set: {
                        password: newPassword,
                    },
                }
            ).then((data) => {
                return data ?? new Error('NOT DATA ERROR');
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }
    getNewPasswordUser = (model) => md5(model.password);
    async resetPassword(email) {
        try {
            const user = await User.findOne({ email: email });
            if (!user || !user.verify) throw new Error('User not exist');
            await UserOTPVerificationForgetPassword.deleteMany({ userId: user._id });
            return await this.sendOTPVerificationForgetPassword(user, email);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async sendOTPVerificationForgetPassword({ _id }, email) {
        try {
            const transporter = await nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.AUTH_EMAIL, // generated ethereal user
                    pass: process.env.AUTH_PASSWORD, // generated ethereal password
                },
            });
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
            const mailOptions = mailOptionsSendOTP(otp, email);
            const newUserOTP = await new UserOTPVerificationForgetPassword({
                userId: _id,
                otp: md5(otp),
            });
            await newUserOTP.save();
            return await transporter.sendMail(mailOptions);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async verifyOTPForgetPassword(email, otp) {
        try {
            const user = await User.findOne({ email: email });
            if (!user || !user.verify) throw new Error('User not exist');
            return await this.executeVerifyOTPForgetPassword(user, otp);
        } catch (err) {}
    }

    async executeVerifyOTPForgetPassword({ _id }, otp) {
        try {
            const userOTPVFP = UserOTPVerificationForgetPassword.findOne({ userId: _id });
            if (!userOTPVFP) throw new Error('OTP NOT FOUND');
            if (md5(String(otp)) === userOTPVFP.otp) {
                const refreshOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
                userOTPVFP.otp = md5(refreshOtp);
                await userOTPVFP.save();
                return md5(refreshOtp);
            }
        } catch (err) {
            throw new Error(err.messages);
        }
    }
}
module.exports = UserService;
