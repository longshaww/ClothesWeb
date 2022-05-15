const Customers = require("../models/Customers");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
	generateRefreshToken,
	generateAccessToken,
} = require("../utils/function");

let refreshTokens = [];
class AuthenticationController {
	//[GET] /register
	async register(req, res, next) {
		let customData = {
			nameCustomer: {
				firstName: req.body["firstName"],
				lastName: req.body["lastName"],
			},
			dateOfBirth: req.body["dateOfBirth"],
			phoneNumber: Number(req.body["phoneNumber"]),
			listProduct: [],
			loginInformation: {
				email: req.body["email"],
				password: req.body["password"],
				isAdmin: false,
			},
			avatar: req.body["avatar"],
		};

		const user = await new Customers(customData);

		await user.save();
		res.json({
			success: true,
			data: user,
		});
	}

	//[POST] /login
	async postLogin(req, res, next) {

		const { email, password } = req.body;
		const listCustomers = await User.find({});

		const customerData = await listCustomers.find((el) => {
	
			return (
				el["email"] === email && el["password"] === password
			);
		});

		if (customerData) {
			const accessToken = generateAccessToken(customerData);
			const refreshToken = generateRefreshToken(customerData);

			refreshTokens.push(refreshToken);
			const data = {
				infoUser: {
					fullName: customerData['information']['name'],
					email: customerData["email"],
					dateOfBirth: customerData['information']['dateOfBirth'],
					gender: customerData['information']['gender'],
					phoneNumber: customerData.phoneNumber,
					avatar: customerData['information'].avatar,
				},

				isAdmin: customerData["isAdmin"],
				accessToken,
				refreshToken,
			};
			res.json({
				success: true,
				user: data,
			});
		} else {
			res.status(400).json({
				success: false,
				msg: "Tài khoản mật khẩu không đúng",
			});
		}
	}

	//[DELETE] /deleteCustomerToken/:customerId
	async deleteTokenCustomer(req, res, next) {
		if (
			req.customer.id === req.params.customerId ||
			req.customer.isAdmin
		) {
			res.status(200).json("Khách hàng đã bị xóa");
		} else {
			res.status(403).json("Bạn không có quyền xóa");
		}
	}

	//[POST] /refreshToken/
	async refreshToken(req, res, next) {
		//lẫy mã token mới từ người dùng
		const refreshToken = req.body.token;
		console.log(refreshToken);
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
		console.log(refreshToken);
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
