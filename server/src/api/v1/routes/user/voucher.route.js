const express = require('express');
const router = express.Router();
const voucherController = require('../../controllers/user/VoucherController');
router.get('/availableForExchange/:id', voucherController.availableForExchange);
router.get('/myVoucher/:id', voucherController.myVoucher);
router.post('/exchangeVoucher', voucherController.exchangeVoucher);
router.post('/apply', voucherController.applyVoucher);
router.put('/updateState/:id', voucherController.updateState);

module.exports = router;
