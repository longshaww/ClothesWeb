const {getUser} = require("../../utils/service");
const User = require("../../models/UserWeb");
class UserController
{ 
    async getUser(req,res,next)
    {
        try{
            return await getUser(req.params.id,res,next);
        }
        catch(err)
        {
            res.status(404).json({
                success : false ,
                msg : err.message   
            })
        }
    }

    async editUser(req,res,next){
        try{
            const userUpdate = await User.updateOne({ "_id": req.params.id },
            {
                $set: {
                    "information.name": req.body.name,
                    "information.phoneNumber" : req.body.phoneNumber,
                    "information.dateOfBirth" : req.body.dateOfBirth,
                    "information.gender" : req.body.gender,
                    "information.address" : req.body.address
                }
            })
           return  await userUpdate ? getUser(req.params.id,res,next) : res.status(404).json({
                success : false,
                msg : "Cập Nhật Thất Bại"
            })
        }
        catch(err)
        {
            res.status(404).json({ 
                success : false,
                msg : err.message
            })
        }
    }
}
module.exports = new UserController();