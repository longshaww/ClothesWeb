const User = require("../../models/User");
const Bill = require("../../models/Bills");
const Product = require("../../models/Product");
class AdminController {
  async getBill(req,res,next)
    {
        const bill = await Bill.find({});
        res.status(200).json({
            success : true, 
            bills:  bill 

        });
    }

    async getUser(reqr,res,next)
    {
        const user = await User.find({});
        res.status(200).json({
            success : true , 
            users : user
        })
        
    }

    async getProduct(req,res,next)
    {
        const product = await  Product.find({});
        res.status(200).json({
            "success" : true ,
            products : product 
        })
    }
}   

module.exports = new AdminController();
