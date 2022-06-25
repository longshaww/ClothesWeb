const express = require("express");
const router = express.Router();
const voucherController = require("../../controllers/user/VoucherController");

router.post("/", voucherController.createVoucher);

module.exports = router;
