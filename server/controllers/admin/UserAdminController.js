const User = require("../../models/UserWeb");
const moment = require("moment")
class UserAdminController {
    async getAllUser(req, res, next) {
        const listUser = await User.find({"isAdmin":false});
        const listUserBan = await User.findDeleted({})
        let listUserCustom = []; 
        listUser.map(async(el)=>{
            let customData = {
                  id : el._id,
                  name  : el.information.name,
                  phone : el.information.phoneNumber,
                  dateOfBirth : moment(el.information.dateOfBirth,"MM-DD-YYYY").format("l") ,
                  point : el.myPoint,
                  email : el.email,
                  bans : false
            }
            listUserCustom.push(customData);
        })
        listUserBan.map((el)=>{
            let customData = {
                id : el._id,
                name  : el.information.name,
                phone : el.information.phoneNumber,
                dateOfBirth : moment(el.information.dateOfBirth,"MM-DD-YYYY").format("l") ,
                point : el.myPoint,
                email : el.email,
                bans : true
          }
          listUserCustom.push(customData);
        })

        res.status(200).json({
            success: true,
            listUserCustom
        })
    }

    async banUser(req, res, next) {
        await User.delete({ _id: req.params.id })
        res.status(200).json({ success: true, msg: "BAN TÀI KHOẢN THÀNH CÔNG" })
    }

    async  openBanUser(req,res,next)
    {
        console.log("vao")
        await User.restore({_id : req.params.id})
        res.status(200).json({success: true, msg: "SUCCESS"})
    }
}
module.exports = new UserAdminController()