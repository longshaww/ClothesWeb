const { Voucher } = require('../../../models');
class VoucherAdminService {
    constructor() {}

    async getList() {
        const listVoucher = await Voucher.find();
        return listVoucher;
    }

    async detail(id) {
        const voucher = await Voucher.findById(id);
        return voucher;
    }

    async createVoucher(body) {
        const newVoucher = await Voucher.create(body);
        return newVoucher.save();
    }
    async edit(id, body) {
        const editVoucher = await Voucher.findById(id);
        editVoucher.discount = body.discount;
        editVoucher.dateStart = body.dateStart;
        editVoucher.dateEnd = body.dateEnd;
        editVoucher.maxDiscount = body.maxDiscount;
        editVoucher.qualifyAmount = body.qualifyAmount;
        editVoucher.qty = body.qty;
        return editVoucher.save();
    }
    async delete(id) {
        const deleteVoucher = await Voucher.findByIdAndDelete(id);
        return deleteVoucher;
    }
}

module.exports = new VoucherAdminService();
