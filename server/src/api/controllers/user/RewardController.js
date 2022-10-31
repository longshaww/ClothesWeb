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
            return successRes(
                res,
                200,
                data,
                `Successfully achieve voucher. This voucher is automatically added to your own voucher list`
            );
        } catch (err) {
            throwErr(res, 400, err.message);
        }
    }
}

module.exports = new RewardController();
