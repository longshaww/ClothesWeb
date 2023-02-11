const { throwErr, successRes } = require('../../utils/HandleResponse');
const voucherService = require('../../services/user/voucher');
class VoucherController {
    async availableForExchange(req, res) {
        try {
            const idUser = req.params.id;
            const validateIdUser = /^[0-9a-fA-F]{24}$/;

            if (!validateIdUser.test(idUser)) {
                return throwErr(res, 400, 'Invalid Id User');
            }
            return successRes(res, 200, await voucherService.availableForExchange(idUser));
        } catch (err) {
            throwErr(res, 500, err.message);
        }
    }
    async myVoucher(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throwErr(res, 400, 'Can not get list voucher');
            }
            const myVoucher = await voucherService.myVoucher(id);
            return successRes(res, 200, myVoucher);
        } catch (err) {
            throwErr(res, 500, err.message);
        }
    }

    async exchangeVoucher(req, res) {
        const { userID, voucherID } = req.body;
        if (!userID && !voucherID) {
            return throwErr(res, 403, 'Forbidden');
        }
        try {
            const data = await voucherService.exchangeVoucher(userID, voucherID);
            return successRes(
                res,
                200,
                data,
                `Successfully achieve voucher. This voucher is automatically added to your own voucher list`
            );
        } catch (err) {
            return throwErr(res, 400, err.message);
        }
    }
    async applyVoucher(req, res) {
        try {
            const { code, amount } = req.body;
            if (!code || !amount) {
                return throwErr(res, 400, 'Voucher invalid');
            }
            const applyVoucher = await voucherService.apply(code, amount);
            return successRes(res, 200, applyVoucher, 'Apply voucher successfully ');
        } catch (err) {
            throwErr(res, 500, err.message);
        }
    }

    async updateState(req, res) {
        try {
            const { id } = req.params;
            const { userID } = req.body;
            if (!id || !userID) {
                return throwErr(res, 400, 'Update state failed');
            }
            await voucherService.updateState(id, userID);
            return successRes(res, 200, '', 'Update State Voucher successfull');
        } catch (err) {
            throwErr(res, 500, err.message);
        }
    }
}
module.exports = new VoucherController();
