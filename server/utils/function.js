const jwt = require("jsonwebtoken");
const multer = require("multer");
const path= require("path");
module.exports = {
    generateAccessToken :  (user) => {
        const dataSign = {
            id: user['_id'], 
            email : user['email'],
            information :  user['information'],
            isAdmin: user['isAdmin']
        }
        // tạo ra token
        return jwt.sign(dataSign, "mySecretKey", {
            expiresIn: "90 days"
        });
    
    },
    generateRefreshToken : (user) => {
        const dataSign = {
            id: user['_id'], 
            email : user['email'],
            information :  user['information'],
            isAdmin: user['isAdmin']
        }
        return jwt.sign(dataSign, "myRefreshToken");
    
    },

    checkIfNameOrNot : (ascending, descending, list) => {
        if (ascending === "true") {
            list.sort((a, b) => {
                return a.price - b.price;
            });
        }
        if (descending === "true") {
            list.sort((a, b) => {
                return b.price - a.price;
            });
        }
        return list;
    },
    storage : multer.diskStorage({
        destination : (req,file,cb) =>{
            cb(null,'public')
        },
        filename : (req,file,cb) =>{
            console.log(file);
            cb(null,Date.now()+ path.extname(file.originalname));
        }
    }),
}