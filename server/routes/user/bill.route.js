const express = require("express");
const router = express.Router();

const billController = require("../../controllers/user/BillController");

router.post("/", billController.postBill);
router.post("/history", billController.getBillHistory);
router.post("/user", billController.getListInfoUser);

module.exports = router;
