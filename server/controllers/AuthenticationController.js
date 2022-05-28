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

		let newCustomer;
		try {
			if (!req.body) {
				res.status(400).send("You cannot post without data");
			}
			const {
				email,
				nameCustomer,
				password,
				phoneNumber,
				dateOfBirth,
				gender,
				avatar,
				address,
			} = req.body;
			new Date(dateOfBirth);
			const existedCustomer = await Customers.findOne({
				email,
			});
			if (existedCustomer !== null) {
				newCustomer = existedCustomer;
				existedCustomer.isRegister = true;
				existedCustomer.save();
			} else {
				newCustomer = await Customers.create({
					nameCustomer,
					address,
					email,
					phoneNumber,
				});
			}

			const newUser = await User.create({
				email: newCustomer.email,
				password,
				dateOfBirth,
				gender,
				avatar,
				customer: newCustomer._id,
			});
			const resUser = await newUser.populate("customer");
			res.status(201).json(resUser);
		} catch (err) {
			res.status(400).send("Something wrong ~!");
			throw new Error(err);
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
