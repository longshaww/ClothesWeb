const express = require("express");
const router = express.Router();

const billAdminController = require("../../controllers/admin/BillAdminController");
router.get("/getNewBill",billAdminController.getNewBill);

module.exports = router;
