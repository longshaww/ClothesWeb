const jwt = require('jsonwebtoken');

module.exports = {
    verifyAdmin: async (req, res, next) => {
     
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, "mySecretKey", (err, dataUser) => {
                if (err) {
                    return res.status(401).json("Token không được định nghĩa");
                } else {
                    if (dataUser.isAdmin) {
                        req.user = dataUser;
                        next();
                    }
                    else {
                        res.json(
                         {   success : false,
                           msg : "Bạn không phải ADMIN"});
                    }

                }
            });
        } else {
            res.json({
                success : false,
                msg : "You are not authenticated"})
        }
    },
    verify: async (req, res, next) => {
        
        const authHeader = req.headers.authorization;
        
        if (authHeader) {
            console.log(authHeader);
            const token = authHeader.split(" ")[1];
            jwt.verify(token, "mySecretKey", (err, dataUser) => {
                if (err) {
                    return res.json(
                        {"success" : false,
                         msg : "token không được định nghĩa"});
                } else {
             
                    console.log("thanh cong")
                    req.customer = dataUser;
                    next();


                }
            });
        } else {
            res.json(
                {
                    "success": false,
                    "msg" : "You are not authenticated"
                })
        }
    }
}