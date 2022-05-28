const User = require("../../models/User");
const Bill = require("../../models/Bills");
const Product = require("../../models/Product");
const moment = require("moment");
class DashBoardController {
    // [GET] /admin/dashboard/getDashBoard
    async getDashboard(req, res, next) {
        const d = await new Date();
        let month = d.getMonth() + 1;
        let qtyBill = 0;
        const listBillOffMonth = await Bill.aggregate([
            {
                $redact: {
                    $cond: [
                        { $eq: [{ $month: "$createdAt" }, month] },
                        "$$KEEP",
                        "$$PRUNE",
                    ],
                },
            },
        ]);
        const qtyProduct = await Product.find({}).count();
        const qtyUser = await User.find({}).count();

        await listBillOffMonth.map(async (el) => {
            el["createdAt"] = await moment(el["createdAt"], "MM-DD-YYYY").format("l");
            qtyBill++;
        });
        res.send({
            success: true,
            bills: {
                listBillOffMonth,
                qtyBill,
            },
            qtyProduct,
            qtyUser,
        });
    }
}

module.exports = new DashBoardController();
