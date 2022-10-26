const ValidatorService = require('../../authenticator/index');
const User = require('../../../models/UserWeb');
const md5 = require('md5');
const nodemailer = require('nodemailer');
const ValidatorServices = require('../../authenticator/index');
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
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async executeVerifyOTPForgetPassword({ _id }, otp) {
        try {
            const idUser = _id.toString();
            const userOTPVFP = await UserOTPVerificationForgetPassword.findOne({
                userId: idUser,
            });
            if (!userOTPVFP) throw new Error('OTP NOT FOUND');
            if (md5(String(otp)) === userOTPVFP.otp && userOTPVFP.step == 1) {
                const refreshOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
                await UserOTPVerificationForgetPassword.deleteMany({ _id: userOTPVFP._id });
                const userOTP = new UserOTPVerificationForgetPassword({
                    userId: idUser,
                    otp: md5(refreshOtp),
                    step: 2,
                });
                await userOTP.save();
                return md5(refreshOtp);
            } else {
                throw new Error('OTP NOT RIGHT');
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async verifyOTPForgetPasswordStep2(model) {
        try {
            const user = await User.findOne({ email: model.email });
            if (!user || !user.verify) throw new Error('User not exist');
            return this.executeVerifyOTPForgetPasswordStep2(user, model);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async executeVerifyOTPForgetPasswordStep2({ _id }, model) {
        try {
            const idUser = _id.toString();
            const userOTPVFP = await UserOTPVerificationForgetPassword.findOne({
                userId: idUser,
            });
            if (!userOTPVFP) throw new Error('OTP NOT FOUND');
            if (model.cryptoOTP === userOTPVFP.otp && userOTPVFP.step == 2) {
                model.currentStep = 'VALIDATE_NEW_PASSWORD';
                const validatorService = new ValidatorService();
                const flag = await validatorService.performValidation(model);
                if (!flag) {
                    throw new Error('Validator find error password');
                }
                await UserOTPVerificationForgetPassword.deleteMany({ userId: idUser });
                await User.updateOne(
                    { _id: idUser },
                    {
                        $set: {
                            password: md5(model.password),
                        },
                    }
                );
                return true;
            } else {
                throw new Error('OTP NOT RIGHT');
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
module.exports = UserService;
