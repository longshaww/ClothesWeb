const UserWeb = require('../../../models/UserWeb');
const Voucher = require('../../../models/Vouchers');
const validation = require('../../authenticator/ValidationReward');

module.exports = {
    availableForExchange: async (id) => {
        let listVoucher = [];
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
        return listVoucher;
    },
    exchangeVoucher: async (userID, voucherID) => {
        const data = await validation.validationReward(UserWeb, userID);
        let myPoint = data.reward;
        if (typeof data === 'string') return data;
        const voucher = await Voucher.findById(voucherID);
        if (!voucher) return `Voucher doest not exist`;
        const discount = voucher.discount;

        if (discount <= 10) {
            if (!myPoint >= 50) return `Your reward have to be larger than 50 to gain this voucher`;
        }
        if (discount >= 20) {
            if (!myPoint >= 100)
                return `Your reward have to be larger than 50 to gain this voucher`;
        }

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
};
