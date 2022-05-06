const jwt = require('jsonwebtoken');

module.exports = {
    verifyAdmin: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            console.log(authHeader);
            const token = authHeader.split(" ")[1];
            jwt.verify(token, "mySecretKey", (err, dataCustomer) => {
                if (err) {
                    return res.status(401).json("token không được định nghĩa");
                } else {
                    console.log(dataCustomer);
                    if (dataCustomer.isAdmin) {
                        req.customer = dataCustomer;
                        next();
                    }
                    else {
                        res.status(404).json("Bạn không phải ADMIN");
                    }

                }
            });
        } else {
            res.status(404).json("You are not authenticated")
        }
    },
    verify: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            console.log(authHeader);
            const token = authHeader.split(" ")[1];
            jwt.verify(token, "mySecretKey", (err, dataCustomer) => {
                if (err) {
                    return res.status(401).json("token không được định nghĩa");
                } else {
                    console.log(dataCustomer);

                    req.customer = dataCustomer;
                    next();


                }
            });
        } else {
            res.status(404).json("You are not authenticated")
        }
    }
}