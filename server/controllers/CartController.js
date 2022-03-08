const Session = require("../models/Sessions");

class CartController {
	async addToCart(req, res, next) {
		const { id } = req.body;
		const sessionId = req.signedCookies.sessionId;
		await Session.updateOne(
			{ _id: sessionId },
			{
				$push: { cart: id },
			}
		);
		const thisSession = await Session.findById(sessionId);
		res.status(200).json(thisSession);
	}
	async getCart(req, res, next) {
		const sessionId = req.signedCookies.sessionId;
		const session = await Session.findById(sessionId);
		res.status(200).json(session);
	}
}

module.exports = new CartController();
