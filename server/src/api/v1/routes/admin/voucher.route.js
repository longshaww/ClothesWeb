const express = require('express');
const router = express.Router();
const voucherController = require('../../controllers/admin/VoucherAdminController');

router.post('/', voucherController.createVoucher);
router.get('/', voucherController.listVoucher);
router.put('/:id', voucherController.editVoucher);
router.delete('/:id', voucherController.deleteVoucher);
router.get('/:id', voucherController.detailVoucher);
module.exports = router;
