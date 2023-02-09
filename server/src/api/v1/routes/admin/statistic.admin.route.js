const express = require('express');
const router = express.Router();

const statisticController = require('../../controllers/admin/StatisticController');
router.get('/', statisticController.filterStatistic);
module.exports = router;
