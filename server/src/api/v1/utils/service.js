const { restart } = require('nodemon');
var ObjectId = require('mongodb').ObjectId;
const { User, Product } = require('../models/index');
const moment = require('moment');
const { generateAccessToken } = require('../utils/function');
module.exports = {
    detailProduct: async (id, res, next) => {
        try {
            const product = await Product.findOne({ _id: ObjectId(id) })
                .populate('description.collection')
                .exec();

            let customData = {
                nameProduct: product.nameProduct,
                price: product.price,
                sizeM: product.size[2].qty,
                sizeL: product.size[1].qty,
                sizeXL: product.size[0].qty,
                image1: product.description.imageList[0],
                image2: product.description.imageList[1],
                description: product.description.productDes,
                collection: product.description.collection.typeName,
            };
            res.status(200).json({
                success: true,
                customData,
            });
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    },
    getUser: async (id, res, next) => {
        try {
            const user = await User.findOne({ _id: ObjectId(id) });
            const customData = {
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                information: user.information,
                myPoint: user.myPoint,
                vip: user.vip,
                role: user.role,
            };
            const accessToken = generateAccessToken(user);
            if (user) {
                res.status(200).json({
                    success: true,
                    user: customData,
                    accessToken,
                });
            } else {
                res.status(404).json({
                    success: false,
                    msg: 'Tài Khoản Không Tổn Tại',
                });
            }
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    },
    getListUser: async (req, res, next) => {
        try {
            const listUser = await User.find({ isAdmin: false });
            const listUserBan = await User.findDeleted({});
            let listUserCustom = [];
            listUser.map(async (el) => {
                let customData = {
                    id: el._id,
                    name: el.information.name,
                    phone: el.information.phoneNumber,
                    dateOfBirth: moment(el.information.dateOfBirth, 'MM-DD-YYYY').format('l'),
                    point: el.myPoint,
                    email: el.email,
                    role: el.role === 2 ? 'Khách Hàng' : 'Nhân Viên',
                    bans: false,
                };
                listUserCustom.push(customData);
            });
            listUserBan.map((el) => {
                let customData = {
                    id: el._id,
                    name: el.information.name,
                    phone: el.information.phoneNumber,
                    dateOfBirth: moment(el.information.dateOfBirth, 'MM-DD-YYYY').format('l'),
                    point: el.myPoint,
                    email: el.email,
                    role: el.role === 2 ? 'Khách Hàng' : 'Nhân Viên',
                    bans: true,
                };
                listUserCustom.push(customData);
            });

            res.status(200).json({
                success: true,
                listUserCustom,
            });
        } catch (err) {
            res.staus(404).json({
                success: false,
                msg: err.message,
            });
        }
    },
};
