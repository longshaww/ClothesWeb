const { successRes, throwErr } = require('../../utils/HandleResponse');
const rewardService = require('../../services/user/reward');
class RewardController {
    async availableForExchange(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return throwErr(res, 403, 'Forbidden');
            }
            const data = await rewardService.availableForExchange(id);
            if (typeof data === 'string') {
                return throwErr(res, 400, data);
            }
            if (!data.length) {
                return throwErr(res, 400, 'There is no available item for exchange');
            }
            return successRes(res, 200, data, 'Successfully get exchange items');
        } catch (err) {
            throwErr(res, 400, err.message);
        }
    }
    async exchangeVoucher(req, res) {
        try {
            const { userID, voucherID } = req.body;
            if (!userID && !voucherID) {
                return throwErr(res, 403, 'Forbidden');
            }
            const data = await rewardService.exchangeVoucher(userID, voucherID);
            if (typeof data === 'string') {
                return throwErr(res, 400, data);
            }
            return successRes(
                res,
                200,
                data,
                `You achieve a voucher with discount ${data.discount}. This voucher is automatically added to your own voucher list`
            );
        } catch (err) {
            throwErr(res, 400, err.message);
        }
    }
}

module.exports = new RewardController();
