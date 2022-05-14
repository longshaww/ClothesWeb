const User = require("../models/User");

class AuthCookieController {
	async postLogin(req, res, next) {
		const { email, password } = req.body;
		var user = await User.findOne({ email });
		if (!user) {
			res.status(400).send("Wrong username");
			return;
		}
		if (user.password !== password) {
			res.status(400).res.send("Wrong password");
			return;
		}
		res.status(200)
			.send("Login success")
			.cookie("userId", user._id, {
				signed: true,
				expires: new Date(Date.now() + 5000000),
				httpOnly: true,
			});
	}

	async register(req, res, next) {
		try {
			if (!req.body) {
				res.status(400).send("You cannot post without data");
			}

			const {
				username,
				password,
				email,
				phoneNumber,
				dateOfBirth,
				gender,
				avatar,
				address,
				customer,
			} = req.body;

			const information = {
				email,
				phoneNumber,
				dateOfBirth,
				gender,
				avatar,
				address,
			};
			const newUser = await User.create({
				username,
				password,
				information,
			});
			res.status(201).json(newUser);
		} catch (err) {
			res.status(400).send("Something wrong ~!");
		}
	}
}

module.exports = new AuthCookieController();
