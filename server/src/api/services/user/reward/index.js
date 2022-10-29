const UserWeb = require('../../../models/UserWeb');
const Voucher = require('../../../models/Vouchers');
const validation = require('../../authenticator/ValidationReward');
const { generateAccessToken } = require('../../../utils/function');
module.exports = {
    availableForExchange: async (id) => {
        let listVoucher = [];
        const data = await validation.validationReward(UserWeb, id);
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
        if (!listVoucher.length) throw new Error('There is no available item for exchange');
        return listVoucher;
    },
    exchangeVoucher: async (userID, voucherID) => {
        const data = await validation.validationReward(UserWeb, userID);
        let myPoint = data.reward;
        const voucher = await Voucher.findById(voucherID);
        if (!voucher) return `Voucher doest not exist`;
        const discount = voucher.discount;

        if (discount <= 10) {
            if (!myPoint >= 50)
                throw new Error('Your reward have to be larger than 50 to gain this voucher');
        }
        if (discount >= 20) {
            if (!myPoint >= 100)
                throw new Error('Your reward have to be larger than 50 to gain this voucher');
        }

        if (voucher.listUser.includes(userID))
            throw new Error('You already have this voucher.Please choose other option');
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
        await voucher.save();
        return generateAccessToken(recentUser);
    },
};
