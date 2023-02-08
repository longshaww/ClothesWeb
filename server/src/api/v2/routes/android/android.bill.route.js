const express = require("express");
const router = express.Router();

const androidBillController = require("../../controllers/android/android.bill.controller");

router.post("/", androidBillController.postBill);
router.post("/customer", androidBillController.addNewInfoUser);
router.put("/customer/:id", androidBillController.editInfoUser);
router.delete("/customer/:id", androidBillController.deleteInfoUser);
router.post("/history", androidBillController.getBillHistory);
router.post("/user", androidBillController.getListInfoUser);

module.exports = router;
