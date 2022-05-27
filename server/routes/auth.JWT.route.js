const express = require("express");
const router = express.Router();
const {verifyAdmin,verify} = require("../middlewares/auth.middleware");
const authenticationController = require("../controllers/AuthenticationController");


router.post("/register",authenticationController.register);

router.post("/login",authenticationController.postLogin);

router.post("/refreshToken",authenticationController.refreshToken)

router.post("/logout",verify,authenticationController.postLogout)

module.exports = router;
