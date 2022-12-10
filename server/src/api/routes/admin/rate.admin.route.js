const express = require('express');
const rateAdminController = require('../../controllers/admin/RateAdminController');
const router = express.Router();

router.delete('/:rateID', rateAdminController.deleteRate);
router.get('/getAllRate', rateAdminController.getAllRate);

module.exports = router;
