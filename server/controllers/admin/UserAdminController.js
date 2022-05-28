const User = require("../../models/UserWeb");
class UserAdminController {
    async getAllUser(req, res, next) {
        const listUser = await User.find({});
        res.status(200).json({
            success: true,
            listUser
        })
    }

    async banUser(req, res, next) {
  
        await User.delete({ _id: req.params.id })
        res.status(200).json({ success: true, msg: "BAN TÀI KHOẢN THÀNH CÔNG" })
    }

    async  openBanUser(req,res,next)
    {
        await User.restore({_id : req.params.id})
        res.status(200).json({success: true, msg: "SUCCESS"})
    }
}
module.exports = new UserAdminController()