const express = require("express");
const router = express.Router();

const billController = require("../../controllers/user/BillController");

router.post("/", billController.postBill);
router.post("/history", billController.getBillHistory);

module.exports = router;
