const Bill = require("../../models/Bills");
class BillAdminController {
    async getAllBill (req,res,next)
    {
        const listBill = await Bill.find({});
        res.status(200).json({
            success: true,
            listBill
        })
    }
    async updateStatus(req,res,next)
    {
        await Bill.updateOne({_id : req.params.id},req.body.status)
        res.status(200).json({
            success: true,
            msg : "SUCCESS"
        })
    }
}
module.exports = new BillAdminController()