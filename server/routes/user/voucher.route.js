const express = require("express");
const router = express.Router();
const voucherController = require("../../controllers/user/VoucherController");

router.post("/", voucherController.createVoucher);
router.get("/", voucherController.listVoucher);
router.put("/:id", voucherController.editVoucher);
router.delete("/:'id", voucherController.deleteVoucher);
router.get("/:id", voucherController.detailVoucher);
router.post("/apply", voucherController.applyVoucher);
router.put("/updateQty/:id", voucherController.updateQtyVoucher);
module.exports = router;
