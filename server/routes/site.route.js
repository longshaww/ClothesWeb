const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const siteController = require("../controllers/SiteController");
const authenciationController = require("../controllers/Authenciation")
const verify = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader)
    {
        const token = authHeader.split(" ")[1];
        console.log("token request là là " + token);
         jwt.verify(token , "mySecretKey",(err,dataCustomer)=>{
            if(err){
                return res.status(401).json("token không được định nghĩa");
            }
            else
            {
                console.log("dataCustomer : " + dataCustomer);
                req.customer = dataCustomer;
                next();
            }
        });
    }
    else
    {
        res.status(404).json("You are not authenticated")
    }
}
router.get("/",siteController.getAllSite);
router.get("/search",siteController.searchView);

router.get("/getlocation",siteController.getLocation);
router.post("/login",authenciationController.postLogin);

router.delete("/deleteCustomerToken/:customerId",verify,authenciationController.deleteTokenCustomer);

router.post("/refreshToken",authenciationController.refreshToken)

router.post("/logout",verify,authenciationController.postLogout)
module.exports = router;