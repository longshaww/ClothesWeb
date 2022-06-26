const express = require("express");
const router = express.Router();
const {verifyAdmin,verify} = require("../middlewares/auth.middleware");
const authenticationController = require("../controllers/AuthenticationController");


router.post("/register",authenticationController.register);

router.post("/login",authenticationController.postLogin);

router.post("/refreshToken",authenticationController.refreshToken);

router.post("/logout",authenticationController.postLogout);

router.post("/verifyOTP",authenticationController.postVerify);

router.post("/resendOTP",authenticationController.postResendOTP);

module.exports = router;
