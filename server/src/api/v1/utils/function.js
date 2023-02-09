const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const UserOTPVerification = require('../models/UserOTPVerification');
const md5 = require('md5');
const nodemailer = require('nodemailer');
const { mailOptionsSendOTP } = require('./mailer');
module.exports = {
    generateAccessToken: (user) => {
        try {
            const dataSign = {
                id: user['_id'],
                email: user['email'],
                information: user['information'],
                isAdmin: user['isAdmin'],
                myPoint: user['myPoint'],
                vip: user['vip'],
                role: user['role'],
            };
            // tạo ra token/
            return jwt.sign(dataSign, 'mySecretKey', {
                expiresIn: '90 days',
            });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    generateRefreshToken: (user) => {
        const dataSign = {
            id: user['_id'],
            email: user['email'],
            information: user['information'],
            isAdmin: user['isAdmin'],
        };
        return jwt.sign(dataSign, 'myRefreshToken');
    },

    checkIfNameOrNot: (ascending, descending, list) => {
        if (ascending === 'true') {
            list.sort((a, b) => {
                return a.price - b.price;
            });
        }
        if (descending === 'true') {
            list.sort((a, b) => {
                return b.price - a.price;
            });
        }
        return list;
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public'));
        },
        filename: (req, file, cb) => {
            let ext = path.extname(file.originalname);
            if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
                cb(new Error('File type is not supported'), false);
                return;
            }
            cb(null, Date.now() + path.extname(file.originalname));
        },
    }),
    sendOTPVerification: async ({ _id, email }, res) => {
        try {
            let transporter = await nodemailer.createTransport({
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
            const newUserOTP = await new UserOTPVerification({
                userId: _id,
                otp: md5(otp),
                expiresAt: Date.now() + 360000,
            });
            await newUserOTP.save();
            await transporter.sendMail(mailOptions);
            res.status(200).json({
                success: true,
                msg: 'Verify otp email sent',
                data: {
                    userId: _id,
                    email,
                },
            });
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    },
};
