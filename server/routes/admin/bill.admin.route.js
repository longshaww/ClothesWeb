const express = require("express");
const router = express.Router();

const billAdminController = require("../../controllers/admin/BillAdminController");
router.get("/getAllBill",billAdminController.getAllBill);
router.put("/update-bill/:id",billAdminController.updateStatus);
module.exports = router;
