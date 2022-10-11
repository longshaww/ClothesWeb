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
        try {
            const validatorService = new ValidatorService();
            const headers = req.headers;
            const model = {
                headers,
                currentStep: 'VERIFY_USER',
            };
            await validatorService.performValidation(model);
        } catch (err) {}
        // const authHeader = req.headers.authorization;
        // if (authHeader) {
        //     const token = authHeader.split(' ')[1];
        //     jwt.verify(token, 'mySecretKey', (err, dataUser) => {
        //         if (err) {
        //             return res.json({ success: false, msg: 'token không được định nghĩa' });
        //         } else {
        //             req.customer = dataUser;
        //             next();
        //         }
        //     });
        // } else {
        //     res.json({
        //         success: false,
        //         msg: 'You are not authenticated',
        //     });
        // }
    },
    validate: async (req, res, next) => {
        try {
            const validatorService = new ValidatorService();
            const { email, password } = req.body;
            const model = {
                email,
                password,
                currentStep: 'VALIDATE_LOGIN',
            };
            const flag = await validatorService.performValidation(model);
            flag
                ? next()
                : res.status(404).json({
                      success: false,
                      msg: 'Login failed',
                  });
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    },
};
