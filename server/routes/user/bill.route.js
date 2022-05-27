const express = require("express");
const router = express.Router();

const billController = require("../../controllers/user/BillController");

router.post("/", billController.postBill);

module.exports = router;
