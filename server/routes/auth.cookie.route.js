const express = require("express");
const router = express.Router();
// const { verifyAdmin, verify } = require("../middlewares/auth.middleware");
const authCookieController = require("../controllers/AuthCookieController");

router.post("/login", authCookieController.postLogin);
router.post("/register", authCookieController.register);

module.exports = router;
