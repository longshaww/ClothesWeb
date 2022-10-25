const Customers = require('../models/Customers');
const jwt = require('jsonwebtoken');
const User = require('../models/UserWeb');
const { generateRefreshToken, generateAccessToken } = require('../utils/function');
const md5 = require('md5');
const UserOTPVerification = require('../models/UserOTPVerification');
let refreshTokens = [];
const { sendOTPVerification } = require('../utils/function');
const UserService = require('../services/user/account/index');
const { throwErr, successRes } = require('../utils/HandleResponse');
class AuthenticationController {
    //[GET] /register
    async register(req, res, next) {
        try {
            const sentinelUser = await User.findOne({ email: req.body.email });
            if (!sentinelUser) {
                let customData = {
                    email: req.body.email,
                    password: md5(req.body.password),
                    information: {
                        name: req.body.name,
                        dateOfBirth: req.body.dateOfBirth,
                        phoneNumber: req.body.phoneNumber,
                        gender: req.body.gender,
                        address: req.body.address,
                    },
                    isAdmin: false,
                    verify: false,
                };

                const user = await new User(customData);

                await user.save();
                return await sendOTPVerification(user, res);
            } else {
                if (sentinelUser.verify === false) {
                    await User.deleteOne({ _id: sentinelUser._id });
                    await UserOTPVerification.deleteMany({ userId: sentinelUser._id });
                    let customData = {
                        email: req.body.email,
                        password: md5(req.body.password),
                        information: {
                            name: req.body.name,
                            dateOfBirth: req.body.dateOfBirth,
                            phoneNumber: req.body.phoneNumber,
                            gender: req.body.gender,
                            address: req.body.address,
                        },
                        isAdmin: false,
                        role: 0,
                        verify: false,
                    };

                    const user = await new User(customData);

                    await user.save();
                    return await sendOTPVerification(user, res);
                } else {
                    res.status(404).json({
                        success: false,
                        msg: 'FAILED EMAIL ALREADY EXIST',
                    });
                }
            }
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }

    //[POST] /login
    async postLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            const listCustomers = await User.find({ verify: true });

            const customerData = await listCustomers.find((el) => {
                return (
                    el['email'].toLowerCase() === email.toLowerCase() &&
                    el['password'] === md5(password)
                );
            });

            if (customerData) {
                const accessToken = generateAccessToken(customerData);
                const refreshToken = generateRefreshToken(customerData);

                refreshTokens.push(refreshToken);
                res.status(200).json({
                    success: true,
                    accessToken,
                    refreshToken,
                });
            } else {
                res.status(400).json({
                    success: false,
                    msg: 'Tài khoản mật khẩu không đúng',
                });
            }
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
    //[POST] /refreshToken/
    async refreshToken(req, res, next) {
        //lẫy mã token mới từ người dùng
        const refreshToken = req.body.token;
        if (!refreshToken) return res.status(401).json('Bạn chưa được xác nhận quyền ');
        // refreshToken moi da co trong mang token r thi loi
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid');
        } else {
            jwt.verify(refreshToken, 'myRefreshToken', (err, customerData) => {
                if (err) {
                    console.log(err);
                } else {
                    refreshTokens = refreshTokens.filter((token) => {
                        token !== refreshToken;
                    });

                    const newAccessToken = jwt.sign(
                        {
                            id: customerData.id,
                            isAdmin: customerData['isAdmin'],
                        },
                        'mySecretKey',
                        {
                            expiresIn: '15m',
                        }
                    );
                    const newRefreshToken = jwt.sign(
                        {
                            id: customerData.id,
                            isAdmin: customerData['isAdmin'],
                        },
                        'myRefreshToken'
                    );

                    refreshTokens.push(newRefreshToken);

                    res.status(200).json({
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    });
                }
            });
        }
    }

    async postLogout(req, res, next) {
        const refreshToken = req.body.token;
        refreshTokens = refreshTokens.filter((token) => token != refreshToken);

        res.status(200).json({
            success: true,
            msg: 'Đăng xuất thành công',
        });
    }
    async postVerify(req, res, next) {
        try {
            let { userId, otp } = req.body;
            if (!userId || !otp) {
                throw Error('Empty otp details are not allowed');
            } else {
                const UserOTPVerificationRecords = await UserOTPVerification.find({ userId });
                if (UserOTPVerificationRecords.length <= 0) {
                    throw Error("Account record doesn't exist or has been verified already ");
                } else {
                    const { expiresAt } = UserOTPVerificationRecords[0];
                    const crytoOTP = UserOTPVerificationRecords[0].otp;
                    if (expiresAt < Date.now()) {
                        // user otp record has expired
                        await UserOTPVerification.deleteMany({ userId });
                        throw new Error('Code has expired please request again');
                    } else {
                        if (md5(String(otp)) === crytoOTP) {
                            // sucess
                            await User.updateOne({ _id: userId }, { verify: true });
                            await UserOTPVerification.deleteMany({ userId });
                            res.status(200).json({
                                success: true,
                                msg: 'Verify Successfully',
                            });
                        } else {
                            res.status(400).json({
                                success: false,
                                msg: 'Verify error',
                            });
                        }
                    }
                }
            }
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
    async postResendOTP(req, res, next) {
        try {
            let { userId, email } = req.body;
            if (!userId || !email) {
                throw Error('Empty user details are not allowed');
            } else {
                // delete existing records and resend
                await UserOTPVerification.deleteMany({ userId });
                return await sendOTPVerification({ _id: userId, email }, res);
            }
        } catch (err) {
            res.json({
                success: false,
                msg: err.message,
            });
        }
    }

    // FORGET PASSWORD
    async forgetPassword(req, res, next) {
        try {
            let { email } = req.body;
            if (email === '' || email === undefined) {
                return throwError(res, 400, 'ERROR REQUEST');
            }
            const userService = new UserService();
            await userService.resetPassword(email);
            return await successRes(res, 200, 'SEND OTP SUCCESS');
        } catch (err) {
            throwErr(res, 400, err.message);
        }
    }
    async verifyOTPForgetPassword(req, res, next) {
        try {
            const { email, otp } = req.body;
            if (email === '' || !email || otp.length < 4 || otp.length > 4) {
                return throwError(res, 400, 'ERROR REQUEST');
            }
            const userService = new UserService();
            const cryptoOTP = await userService.verifyOTPForgetPassword(email, otp);
            await successRes(res, 200, cryptoOTP, 'VERIFY OTP SUCCESS');
        } catch (err) {
            throwErr(res, 400, err.message);
        }
    }

    async veriyOTPForgetPasswordStep2(req, res, next) {
        try {
            const { email, cryptoOTP, password, verifyNewPassword } = req.body;
            if (
                email === '' ||
                !email ||
                !cryptoOTP ||
                cryptoOTP === '' ||
                password === '' ||
                !password ||
                verifyNewPassword === '' ||
                !verifyNewPassword
            ) {
                return throwErr(res, 400, 'ERROR REQUEST');
            }
            const model = {
                email,
                cryptoOTP,
                password,
                verifyNewPassword,
            };
            const userService = new UserService();
            const flag = await userService.verifyOTPForgetPasswordStep2(model);
            if (flag) {
                return successRes(res, 200, null, 'Password Reset Successful');
            }
        } catch (err) {
            return throwErr(res, 400, err.message);
        }
    }
}
module.exports = new AuthenticationController();
