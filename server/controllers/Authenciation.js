const Customers = require("../models/Customers");
const jwt = require("jsonwebtoken");

const generateAccessToken = (customer)=>{
           // tạo ra token
      return  jwt.sign({id:customer._id, isAdmin : customer.loginInformation['isAdmin']},"mySecretKey",{
        expiresIn :  "15m"
    });

}

const generateRefreshToken = (customer)=>{
     return jwt.sign({ id : customer._id , isAdmin : customer.loginInformation['isAdmin']},"myRefreshToken" ) ;

}


let refreshTokens = []
class AuthenciationController{
    
    //[POST] /login
    async postLogin(req,res,next){
        const {username , password } = req.body;
        const listCustomers = await Customers.find({});
        const  customerData = await listCustomers.find((el)=>{
            return el.loginInformation['userName']  === username && el.loginInformation['password'];
        })
        
        
        if(customerData)
        {
           const accessToken = generateAccessToken(customerData);
           const refreshToken =  generateRefreshToken(customerData);
          
           refreshTokens.push(refreshToken);
           
         
            res.json({
                username : customerData.loginInformation['userName'],
                isAdmin : customerData.loginInformation['isAdmin'],
                accessToken,
                refreshToken
            })
        }
        else
        {
            res.status(400).json("Tài khoản mật khẩu không đúng")
        }
    }

    //[DELETE] /deleteCustomerToken/:customerId
    async deleteTokenCustomer(req,res,next){
        
        if(req.customer.id === req.params.customerId || req.customer.isAdmin)
        {
            res.status(200).json("Khách hàng đã bị xóa");
        }
        else
        {
            res.status(403).json("Bạn không có quyền xóa")
        }
    }

    //[POST] /refreshToken/
    async refreshToken(req,res,next)
    {
        //lẫy mã token mới từ người dùng 
        const refreshToken = req.body.token;
        console.log(refreshToken);
        if(!refreshToken)  return res.status(401).json("Bạn chưa được xác nhận quyền ");
        if(!refreshTokens.includes(refreshToken))
        {
            return res.status(403).json("Refresh token is not valid");
        }
        else
        {
              jwt.verify(refreshToken,"myRefreshToken",(err,customerData)=>{
            if(err)
            {
                console.log(err)
            }
            else
            {
              
                refreshTokens =  refreshTokens.filter((token)=>{
                    token !== refreshToken
                })
                
                console.log(customerData);
                 const newAccessToken = jwt.sign({id:customerData.id, isAdmin : customerData['isAdmin']},"mySecretKey",{
        expiresIn :  "15m"});
                 const newRefreshToken = jwt.sign({ id : customerData.id , isAdmin : customerData['isAdmin']},"myRefreshToken" ) ;

                refreshTokens.push(newRefreshToken);
                
                res.status(200).json({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                })
            }
        })
        }
      
    }

    async postLogout(req,res,next)
    {
        const refreshToken = req.body.token ; 
        refreshTokens = refreshTokens.filter((token) => token != refreshToken)
        res.status(200).json("Đăng xuất thành công");
    }
}
module.exports = new AuthenciationController();