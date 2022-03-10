const Session = require("../models/Sessions");

class CartController {
	async addToCart(req, res, next) {
		// let checkIfExist = false;
		let { id, qty, size } = req.body;
		const sessionId = req.signedCookies.sessionId;
		const exactSession = await Session.findOne({
			_id: sessionId,
		});

		const findExisted = exactSession.cart.find((item) => {
			return item.id === id;
		});

		console.log(findExisted);
		if (findExisted !== undefined) {
			await Session.updateOne(
				{ _id: sessionId, "cart.id": id },
				{
					cart: { qty: qty++ },
				}
			);
		} else {
			await Session.updateOne(
				{ _id: sessionId },
				{
					$push: { cart: { _id: id, qty, size } },
				}
			);
		}

		const thisSession = await Session.findById(sessionId).populate(
			"cart"
		);
		res.status(200).json(thisSession);
	}
	async getCart(req, res, next) {
		const sessionId = req.signedCookies.sessionId;
		const session = await Session.findById(sessionId).populate("cart");
		res.status(200).json(session);
	}
}

module.exports = new CartController();
