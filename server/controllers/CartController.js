const Session = require("../models/Sessions");

class CartController {
	async addToCart(req, res, next) {
		let { id, qty, size } = req.body;

		const sessionId = req.signedCookies.sessionId;
		const currentSession = await Session.findById(sessionId);

		const findExisted = currentSession.cart.find((item) => {
			return item.id === id;
		});

		if (findExisted !== undefined) {
			let subDoc = currentSession.cart.id(id);
			subDoc.set({ qty: subDoc.qty + qty });
			await currentSession.save();
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
		const thisSession = await Session.findById(sessionId).populate(
			"cart._id"
		);
		res.status(200).json(thisSession);
	}
	async deleteProduct(req, res, next) {
		const { productId } = req.params;
		const sessionId = req.signedCookies.sessionId;
		const currentSession = await Session.findById(sessionId);
		let subDoc = currentSession.cart.id(productId);
		subDoc.remove();
		await currentSession.save();

		const thisSession = await Session.findById(sessionId).populate(
			"cart._id"
		);
		res.status(200).json(thisSession);
	}
}

module.exports = new CartController();
