const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/UserController');
const rewardController = require('../../controllers/user/RewardController');
const rateController = require('../../controllers/user/RateController');

router.get('/getUser/:id', userController.getUser);
router.put('/editUser/:id', userController.editUser);
router.get('/getBillUser/:id', userController.getBillUser);
router.get('/getRateUser', userController.getRateUser);
router.get('/availableForExchange/:id', rewardController.availableForExchange);
router.post('/exchangeVoucher/', rewardController.exchangeVoucher);
router.post('/rate/:productID', rateController.rateProduct);
router.put('/changePassword', userController.changePassword);
module.exports = router;
