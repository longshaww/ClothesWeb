const { throwErr, successRes } = require('../../utils/HandleResponse');
const rateService = require('../../services/user/rate');

class RateController {
    async rateProduct(req, res) {
        try {
            const { productID } = req.params;
            const { userID, data } = req.body;

            if (!productID || !userID) return throwErr(res, 403, 'Forbidden');

            const rate = await rateService.rateProduct(userID, productID, data);

            if (typeof rate === 'string') return throwErr(res, 404, rate);
            return successRes(res, 200, rate, 'Created successfully');
        } catch (err) {
            return throwErr(res, 400, err.message);
        }
    }
}

module.exports = new RateController();
