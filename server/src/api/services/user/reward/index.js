const UserWeb = require('../../../models/UserWeb');
const Voucher = require('../../../models/Vouchers');
const Product = require('../../../models/Product');
const validation = require('./validation');

module.exports = {
    availableForExchange: async (id) => {
        let listVoucher = [];
        let listProduct = undefined;
        const data = await validation.validationReward(UserWeb, id);
        if (typeof data === 'string') return data;
        if (data.reward >= 50) {
            const voucher = await Voucher.findOne({ discount: 10 });
            if (!voucher) return;
            listVoucher.push(voucher);
        }
        if (data.reward >= 100) {
            const voucher = await Voucher.findOne({ discount: 20 });
            if (!voucher) return;
            listVoucher.push(voucher);
        }
        //This is a field recently added , for admin panel please add this field as a switch to define if a product is exchangeable or not
        if (data.reward >= 200) {
            const products = await Product.find({ isForReward: true });
            listProduct = products;
            if (!products.length) {
                listProduct = await Product.find({ price: { $lt: 300 } });
            }
        }
        return { listVoucher, listProduct };
    },
    exchangeVoucher: async (userID, voucherID) => {
        const data = await validation.validationReward(UserWeb, userID);
        let myPoint = data.user.myPoint;
        if (typeof data === 'string') return data;
        if (!data.reward >= 50) return `Your reward have to be larger than 50 to gain a voucher`;
        const voucher = await Voucher.findById(voucherID);
        if (!voucher) return `Voucher doest not exist`;
        if (voucher.listUser.includes(userID))
            return `You already have this voucher.Please choose other option`;
        voucher.listUser.push(userID);
        if (voucher.discount === 10) {
            myPoint -= 50;
        }
        if (voucher.discount === 20) {
            myPoint -= 100;
        }
        const recentUser = await UserWeb.findById(userID);
        recentUser.myPoint = myPoint;
        await recentUser.save();
        return await voucher.save();
    },
    exchangeProduct: async (userID, productID) => {},
};
