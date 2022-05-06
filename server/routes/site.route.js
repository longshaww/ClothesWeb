const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const siteController = require("../controllers/SiteController");
const authenciationController = require("../controllers/Authenciation")
const {verifyAdmin,verify} = require("../middlewares/auth.middleware");

router.get("/",siteController.getAllSite);
router.get("/search",siteController.searchView);

router.get("/getlocation",siteController.getLocation);


router.post("/register",authenciationController.register);
router.post("/login",authenciationController.postLogin);

router.delete("/deleteCustomerToken/:customerId",verifyAdmin,authenciationController.deleteTokenCustomer);

router.post("/refreshToken",authenciationController.refreshToken)

router.post("/logout",verify,authenciationController.postLogout)
module.exports = router;