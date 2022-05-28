const User = require("../../models/User");
const Bill = require("../../models/Bills");
const Product = require("../../models/Product");
class DashBoardController {
    // [GET] /admin/dashboard/getDashBoard
    getDashboard(req,res,next)
    {
        res.send("thanh cong");
    }
    

   
}   

module.exports = new DashBoardController();
