const Voucher = require('../../../models/Vouchers');
const moment = require('moment');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    createVoucher: async function (body) {
        const newVoucher = await Voucher.create(body);
        return newVoucher.save();
    },
    editVoucher: async function (id, body) {
        const editVoucher = await Voucher.findById(id);
        editVoucher.discount = body.discount;
        editVoucher.dateStart = body.dateStart;
        editVoucher.dateEnd = body.dateEnd;
        editVoucher.maxDiscount = body.maxDiscount;
        editVoucher.qualifyAmount = body.qualifyAmount;
        editVoucher.qty = body.qty;
        return editVoucher.save();
    },
    deleteVoucher: async function (id) {
        const deleteVoucher = await Voucher.findByIdAndDelete(id);
        return deleteVoucher;
    },
    listVoucher: async function (code, amount, user) {
        if (code && amount) {
            if (!ObjectId.isValid(code)) {
                return 'Mã voucher không đúng định dạng';
            }
            const voucher = await Voucher.findById(code);
            if (!voucher) {
                return 'Mã voucher không tồn tại';
            }
            const existed = voucher.listUser.indexOf(user);
            if (existed == -1) {
                return 'Bạn không sở hữu voucher này';
            }
            if (!user) {
                return 'Bạn phải đăng nhập để sử dụng voucher';
            }

            if (!voucher.qty > 0) {
                return 'Số lượng voucher đã hết';
            }
            const diffDayStart = moment().diff(moment(voucher.dateStart), 'days');
            const diffDaysEnd = moment(voucher.dateEnd).diff(moment(), 'days');
            if (diffDayStart < 0) {
                return `Voucher khả dụng vào ngày ${moment(voucher.dateEnd).format('ll')}`;
            }
            if (diffDaysEnd <= 0) {
                return 'Voucher đã hết hạn';
            }
            if (amount < voucher.qualifyAmount) {
                return 'Voucher không đủ điều kiện';
            }
            let discount = (amount * voucher.discount) / 100;
            if (discount > voucher.maxDiscount) {
                discount = voucher.maxDiscount;
            }
            return true;
        } else {
            const listVoucher = await Voucher.find();
            return listVoucher;
        }
    },
    applyVoucher: async function (code, amount) {
        const voucher = await Voucher.findById(code);
        let discount = (amount * voucher.discount) / 100;
        if (discount > voucher.maxDiscount) {
            discount = voucher.maxDiscount;
        }
        await voucher.save();
        return { discount, amount: amount - discount };
    },
    userGetVoucher: async function (code, user) {
        const voucher = await Voucher.findById(code);
        if (!voucher) {
            return 'Voucher không tồn tại';
        }
        const existed = voucher.listUser.indexOf(user);
        if (existed !== -1) {
            return ' Bạn đã lấy voucher này rồi';
        }
        voucher.listUser.push(user);
        return voucher.save();
    },
    updateState: async function (id, userID) {
        const voucher = await Voucher.findById(id);
        if (!voucher) {
            return 'Mã voucher không tồn tại';
        }
        const user = voucher.listUser.indexOf(userID);
        if (user === -1) {
            return 'Không tìm thấy user';
        }
        voucher.listUser.splice(userID, 1);
        voucher.qty = voucher.qty - 1;
        return voucher.save();
    },
    detailVoucher: async function (id) {
        const voucher = await Voucher.findById(id);
        return voucher;
    },
    myVoucher: async function (id) {
        const vouchers = await Voucher.find({
            listUser: id,
        });
        return vouchers;
    },
};
