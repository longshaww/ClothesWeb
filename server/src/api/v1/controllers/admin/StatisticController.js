const { successRes, throwErr } = require('../../utils/HandleResponse');
const statisticService = require('../../services/admin/statistic');
class DashBoardController {
    // [GET] /admin/dashboard/getDashBoard
    async filterStatistic(req, res) {
        try {
            const data = await statisticService.filterStatistic(req.query);
            return successRes(res, 200, data);
        } catch (err) {
            throwErr(res, 500, err.message);
        }
    }
}

module.exports = new DashBoardController();
