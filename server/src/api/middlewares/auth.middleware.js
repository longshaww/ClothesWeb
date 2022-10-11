const jwt = require('jsonwebtoken');
const ValidatorService = require('../services/authenticator/index');
module.exports = {
    verifyAdmin: async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, 'mySecretKey', (err, dataUser) => {
                if (err) {
                    return res.status(401).json('Token không được định nghĩa');
                } else {
                    if (dataUser.isAdmin) {
                        req.user = dataUser;
                        next();
                    } else {
                        res.json({ success: false, msg: 'Bạn không phải ADMIN' });
                    }
                }
            });
        } else {
            res.json({
                success: false,
                msg: 'You are not authenticated',
            });
        }
    },
    verify: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, 'mySecretKey', (err, dataUser) => {
                if (err) {
                    return res.json({ success: false, msg: 'token không được định nghĩa' });
                } else {
                    req.customer = dataUser;
                    next();
                }
            });
        } else {
            res.json({
                success: false,
                msg: 'You are not authenticated',
            });
        }
    },
    validate: async (req, res, next) => {
        const validatorService = new ValidatorService();
        const { email, password } = req.body;
        const test = {
            email,
            password,
            currentStep: 'ACCOUNT_INFO',
        };
        const flag = await validatorService.performValidation(test);
        console.log(flag);
    },
};
