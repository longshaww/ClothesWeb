const { throwErr, successRes } = require('../../utils/HandleResponse');
const rateService = require('../../services/admin/rate');

class RateAdminController {
    async deleteRate(req, res) {
        try {
            const { rateID } = req.params;
            if (!rateID) return throwErr(res, 403, 'Forbidden');
            const deleteRate = await rateService.deleteRate(rateID);
            if (!deleteRate) throwErr(res, 400, `Cannot delete rate: ${rateID}`);
            successRes(res, 200, deleteRate, 'Delete successfully');
        } catch (err) {
            throwErr(res, 400, err.message);
        }
    }
}

module.exports = new RateAdminController();
