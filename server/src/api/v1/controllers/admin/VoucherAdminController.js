const voucherService = require('../../services/admin/voucher');
const { throwErr, successRes } = require('../../utils/HandleResponse');
class VoucherAdminController {
    constructor() {}
    async createVoucher(req, res) {
        try {
            if (Object.keys(req.body).length === 0) {
                return throwErr(res, 400, 'Cannot post without body');
            }
            const newVoucher = await voucherService.createVoucher(req.body);
            if (!newVoucher) {
                return throwErr(res, 400, 'Something went wrong ~!');
            }
            return successRes(res, 201, newVoucher);
        } catch (err) {
            throwErr(res, 500, err.message);
        }
    }
    async editVoucher(req, res) {
        try {
            const { id } = req.params;
            if (Object.keys(req.body).length === 0) {
                return throwErr(res, 400, 'Cannot post without body');
            }
            if (!id) {
                return throwErr(res, 400, 'Cannot post without id');
            }
            const editVoucher = await voucherService.edit(id, req.body);
            if (!editVoucher) {
                return throwErr(res, 400, 'Cannot find voucher with id ' + id);
            }
            return successRes(res, 200, editVoucher);
        } catch (err) {
            throwErr(res, 500, err.message);
        }
    }
    async deleteVoucher(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return throwErr(res, 400, 'Cannot post without body');
            }
            const deleteVoucher = await voucherService.delete(id);
            if (!deleteVoucher) {
                throwErr(res, 400, 'Cannot find voucher with id ' + id);
            }
            return successRes(res, 200, deleteVoucher);
        } catch (err) {
            throwErr(res, 500, err.message);
        }
    }

    async listVoucher(req, res) {
        try {
            return successRes(res, 200, await voucherService.getList());
        } catch (err) {
            throwErr(res, 500, err.message);
        }
    }

    async detailVoucher(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throwErr(res, 400, 'Cannot post without ID');
            }
            const detailVoucher = await voucherService.detail(id);
            if (!detailVoucher) {
                throwErr(res, 400, 'Cannot find voucher id ' + id);
            }
            return successRes(res, 200, detailVoucher);
        } catch (err) {
            throwErr(res, 500, err.message);
        }
    }
}

module.exports = new VoucherAdminController();
