const express = require("express");
const router = express.Router();

const billAdminController = require("../../controllers/admin/BillAdminController");
router.get("/getAllBill",billAdminController.getAllBill);
router.get("/update-bill",billAdminController.updateStatus);
module.exports = router;
