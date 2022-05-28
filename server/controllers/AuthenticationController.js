const Customers = require("../models/Customers");
const jwt = require("jsonwebtoken");
const User = require("../models/UserWeb");
const {
	generateRefreshToken,
	generateAccessToken,
} = require("../utils/function");
const md5 = require("md5");	
let refreshTokens = [];
class AuthenticationController {
	//[GET] /register
	async register(req, res, next) {

		const userSentinel = await User.findOne({"email": req.body.email});
		if(!userSentinel)
		{

			let customData = {
				email: req.body.email,
				password: md5(req.body.password),
				information: {
					name: req.body.information.name,
					dateOfBirth: req.body.information.dateOfBirth,
					phoneNumber: req.body.information.phoneNumber,
					gender: req.body.information.gender,
					address: req.body.information.address,
				},
				isAdmin: false,
			};
			
			const user = await new User(customData);

			await user.save();
			res.json({
				success: true,
				data: user,
			});
		}
		else
		{
			res.status(404).json({
				success: false,
				msg : "TÀI KHOẢN ĐÃ TỒN TẠI"
			})
		}


	}

	//[POST] /login
	async postLogin(req, res, next) {
		const { email, password } = req.body;
		const listCustomers = await User.find({});

		const customerData = await listCustomers.find((el) => {
			return el["email"] === email && el["password"] === md5(password);
		});

		if (customerData) {
			const accessToken = generateAccessToken(customerData);
			const refreshToken = generateRefreshToken(customerData);

			refreshTokens.push(refreshToken);
			res.status(200).json({
				success: true,
				accessToken,
				refreshToken
			});
		} else {
			res.status(400).json({
				success: false,
				msg: "Tài khoản mật khẩu không đúng",
			});
		}
	}
	//[POST] /refreshToken/
	async refreshToken(req, res, next) {
		//lẫy mã token mới từ người dùng
		const refreshToken = req.body.token;
		if (!refreshToken)
			return res.status(401).json("Bạn chưa được xác nhận quyền ");
		// refreshToken moi da co trong mang token r thi loi
		if (!refreshTokens.includes(refreshToken)) {
			return res.status(403).json("Refresh token is not valid");
		} else {
			jwt.verify(
				refreshToken,
				"myRefreshToken",
				(err, customerData) => {
					if (err) {
						console.log(err);
					} else {
						refreshTokens = refreshTokens.filter((token) => {
							token !== refreshToken;
						});

						console.log(customerData);
						const newAccessToken = jwt.sign(
							{
								id: customerData.id,
								isAdmin: customerData["isAdmin"],
							},
							"mySecretKey",
							{
								expiresIn: "15m",
							}
						);
						const newRefreshToken = jwt.sign(
							{
								id: customerData.id,
								isAdmin: customerData["isAdmin"],
							},
							"myRefreshToken"
						);

						refreshTokens.push(newRefreshToken);

						res.status(200).json({
							accessToken: newAccessToken,
							refreshToken: newRefreshToken,
						});
					}
				}
			);
		}
	}

	async postLogout(req, res, next) {
		const refreshToken = req.body.token;
		refreshTokens = refreshTokens.filter(
			(token) => token != refreshToken
		);

		res.status(200).json({
			success: true,
			msg: "Đăng xuất thành công",
		});
	}
}
module.exports = new AuthenticationController();
