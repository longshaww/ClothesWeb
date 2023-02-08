const express = require('express');
const router = express.Router();

const statisticController = require('../../controllers/admin/StatisticController');
router.get('/', statisticController.filterStatistic);
router.get('/getDashBoard', statisticController.getDashboard);
module.exports = router;
