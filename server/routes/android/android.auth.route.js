const express = require("express");
const router = express.Router();

const androidAuthController = require("../../controllers/android/android.auth.controller");

router.post("/login", androidAuthController.postLogin);
router.post("/register", androidAuthController.register);
router.post("/update", androidAuthController.updatePassword);

module.exports = router;
