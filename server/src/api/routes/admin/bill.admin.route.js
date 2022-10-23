const express = require('express');
const router = express.Router();

const billAdminController = require('../../controllers/admin/BillAdminController');
router.get('/getAllBill', billAdminController.getAllBill);
router.put('/update-bill/:idBill', billAdminController.updateStatus);
router.put('/update-statusMoney/:idCancelBill', billAdminController.updateStatusMoneyCancelBill);
module.exports = router;
