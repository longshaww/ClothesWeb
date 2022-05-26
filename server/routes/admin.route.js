const express = require("express");
const router = express.Router();
// const { verifyAdmin, verify } = require("../middlewares/auth.middleware");
const adminController = require("../controllers/AdminController");

router.get("/dashboard", adminController.getDashboard);

router.get("/getBills",adminController.getBill);

router.get("/getUser",adminController.getUser);

router.get("/getProduct",adminController.getProduct);


module.exports = router;
