const {getUser} = require("../../utils/service");
class UserController
{ 
    async getUser(req,res,next)
    {
        try{
            await getUser(req.params.id,res,next);
        }
        catch(err)
        {
            res.status(404).json({
                success : false ,
                msg : err.message   
            })
        }
    }
}
module.exports = new UserController();