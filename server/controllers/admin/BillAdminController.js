const Bill = require("../../models/BillWeb");
const moment = require("moment");
class BillAdminController {
    async getAllBill(req, res, next) {
        const listBill = await Bill.find({});
        let listBillCustom = [];
        
        Promise.all(listBill.map(async (el) => {
            let customData = {
                id: el['_id'],
                qtyProduct: el['qtyProduct'],
                total: el['total'] + ",000 VND",
                paymentMethod: el.paymentMethod,
                status: el.status,
                createdAt: moment(el["createdAt"]).format("DD/MM/YYYY")
            }

            await listBillCustom.push(customData);

        }))
        res.status(200).json({
            success: true,
            listBillCustom
        })
    }
    async updateStatus(req, res, next) {
        try {
      
            if (req.body.status === true) {
                await Bill.updateOne({ _id: req.params.id },  {
                    $set: {
                        "status": req.body.status,
                    }
                })
                res.status(200).json({
                    success: true,
                    msg: "SUCCESS"
                })
            }
            else
            {
                await Bill.updateOne({ _id: req.params.id }, req.body.status)
                res.status(404).json({
                    success: false,
                    msg: "FAILED STATUS REQUEST"
                })
            }
        }
        catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message
            })
        }
    }
}
module.exports = new BillAdminController()