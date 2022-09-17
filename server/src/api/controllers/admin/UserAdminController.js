const User = require("../../models/UserWeb");
const moment = require("moment")
const {getListUser} = require("../../utils/service");
class UserAdminController {
    async getAllUser(req, res, next) {
      return getListUser(req,res,next);
    }

    async banUser(req, res, next) {
         User.delete({ _id: req.params.id })
        .then((data)=>{
          return  getListUser(req, res, next);
        })
        .catch((err)=>{
            res.status(404).json({
                success: false,
                msg : err.message
            })
        })
    }

    async  openBanUser(req,res,next)
    {
        await User.restore({_id : req.params.id})
        .then((data)=>{
            return  getListUser(req, res, next);
          })
          .catch((err)=>{
              res.status(404).json({
                  success: false,
                  msg : err.message
              })
          })
    }
}
module.exports = new UserAdminController()