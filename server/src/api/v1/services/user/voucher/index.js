const { Voucher, User } = require('../../../models');
const { validationReward } = require('../../../utils/helper');
const { generateAccessToken } = require('../../../utils/function');
class VoucherService {
    constructor() {}

    async availableForExchange(idUser) {
        try {
            const user = await User.findById(idUser);
            const listVoucherOfUser = user.listVoucher;
            const vouchers = await Voucher.find({});
            const now = new Date();
            return vouchers.filter(
                (voucher) =>
                    !listVoucherOfUser.includes(voucher._id) &&
                    voucher.dateStart <= now &&
                    voucher.dateEnd >= now &&
                    !voucher.listUser.includes(idUser)
            );
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async myVoucher(idUser) {
        try {
            const user = await User.findById(idUser);
            const now = new Date();
            const vouchers = await Voucher.find({ _id: { $in: user.listVoucher } });
            const validVouchers = vouchers.filter(
                (voucher) => voucher.dateStart <= now && voucher.dateEnd >= now
            );
            return validVouchers;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async exchangeVoucher(userID, voucherID) {
        const data = await validationReward(User, userID);
        let myPoint = data.reward;
        const voucher = await Voucher.findById(voucherID);
        const user = await User.findById(userID);
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
        user.listVoucher.push(voucherID);
        const recentUser = await User.findById(userID);
        recentUser.myPoint = myPoint - 100;
        await recentUser.save();
        await user.save();
        return generateAccessToken(recentUser);
    }

    async apply(code, amount) {
        try {
            const voucher = await Voucher.findById(code);
            let discount = (amount * voucher.discount) / 100;
            if (discount > voucher.maxDiscount) {
                discount = voucher.maxDiscount;
            }
            await voucher.save();
            return { discount, amount: amount - discount };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateState(voucherId, userId) {
        try {
            const voucher = await Voucher.findById(voucherId);
            const user = await User.findById(userId);

            let listVoucherOfUser = user.listVoucher;
            if (listVoucherOfUser.indexOf(voucherId) === -1) {
                throw new Error('Voucher code does not exist');
            }

            listVoucherOfUser.splice(listVoucherOfUser.indexOf(voucherId), 1);
            user.listVoucher = listVoucherOfUser;
            await user.save();

            voucher.listUser.push(userId);
            await voucher.save();
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new VoucherService();
