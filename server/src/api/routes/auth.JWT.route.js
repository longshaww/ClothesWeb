const express = require('express');
const router = express.Router();
const { verifyAdmin, verify,validate } = require('../middlewares/auth.middleware');
const authenticationController = require('../controllers/AuthenticationController');
const ValidatorService = require('../services/authenticator/index');

router.post('/register',validate, authenticationController.register);

router.post('/login',validate, authenticationController.postLogin);

router.post('/refreshToken', authenticationController.refreshToken);

router.post('/logout', authenticationController.postLogout);

router.post('/verifyOTP', authenticationController.postVerify);

router.post('/resendOTP', authenticationController.postResendOTP);

module.exports = router;
