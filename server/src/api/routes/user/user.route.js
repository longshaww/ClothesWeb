const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/UserController');
const rewardController = require('../../controllers/user/RewardController');

router.get('/getUser/:id', userController.getUser);
router.put('/editUser/:id', userController.editUser);
router.get('/getBillUser/:id', userController.getBillUser);
router.get('/availableForExchange/:id', rewardController.availableForExchange);
router.post('/exchangeVoucher/', rewardController.exchangeVoucher);

module.exports = router;
