const Session = require("../models/Sessions");
class CartController {
	async addToCart(req, res, next) {
		// let checkIfExist = false;
		let { id, qty, size } = req.body;

		const sessionId = req.signedCookies.sessionId;
		const exactSession = await Session.findById(sessionId);

		const findExisted = exactSession.cart.find((item) => {
			return item.id === id;
		});

		if (findExisted !== undefined) {
			let subDoc = exactSession.cart.id(id);
			subDoc.set({ qty: subDoc.qty + qty });
			await exactSession.save();
		} else {
			await Session.updateOne(
				{ _id: sessionId },
				{
					$push: { cart: { _id: id, qty, size } },
				}
			);
		}

		const thisSession = await Session.findById(sessionId).populate(
			"cart._id"
		);
		res.status(200).json(thisSession);
	}
	async getCart(req, res, next) {
		const sessionId = req.signedCookies.sessionId;
		const session = await Session.findById(sessionId).populate(
			"cart._id"
		);
		res.status(200).json(session);
	}
}

module.exports = new CartController();
