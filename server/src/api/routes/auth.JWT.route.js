const express = require('express');
const router = express.Router();
const { verifyAdmin, verify, validate } = require('../middlewares/auth.middleware');
const authenticationController = require('../controllers/AuthenticationController');

router.post('/register', validate, authenticationController.register);

router.post('/login', validate, authenticationController.postLogin);

router.post('/refreshToken', authenticationController.refreshToken);

router.post('/logout', authenticationController.postLogout);

router.post('/verifyOTP', authenticationController.postVerify);

router.post('/resendOTP', authenticationController.postResendOTP);

router.post('/forgetPassword', authenticationController.forgetPassword);
router.post('/verifyOTPForgetPassword', authenticationController.verifyOTPForgetPassword);
router.post('/veriyOTPForgetPasswordStep2', authenticationController.veriyOTPForgetPasswordStep2);
module.exports = router;
