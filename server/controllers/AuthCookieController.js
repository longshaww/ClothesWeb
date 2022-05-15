const User = require("../models/User");
const Customer = require("../models/Customers");
var moment = require("moment"); // require

class AuthCookieController {
	async postLogin(req, res, next) {
		try {
			const { email, password } = req.body;
			var user = await User.findOne({ email }).populate("customer");
			if (!user) {
				res.status(400).send("Wrong username");
				return;
			}
			if (user.password !== password) {
				res.status(400).send("Wrong password");
				return;
			}
			res.status(200)
				.cookie("userId", user._id, {
					signed: true,
					expires: new Date(Date.now() + 5000000),
					httpOnly: true,
				})
				.json(user);
		} catch (err) {
			res.status(400).send("Something wrong ~!");
			throw new Error(err);
		}
	}

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
			const existedCustomer = await Customer.findOne({
				email,
			});
			if (existedCustomer !== null) {
				newCustomer = existedCustomer;
				existedCustomer.isRegister = true;
				existedCustomer.save();
			} else {
				newCustomer = await Customer.create({
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
			res.status(201).json(newUser);
		} catch (err) {
			res.status(400).send("Something wrong ~!");
			throw new Error(err);
		}
	}
}

module.exports = new AuthCookieController();
