const Session = require("../../models/Sessions");
const Product = require("../../models/Product");
const getCartUtil = require("../../utils/cart.util");
class CartController {
	async addToCart(req, res, next) {
		let { id, qty, size } = req.body;
		const product = await Product.findById(id);
		const productPrice = product.price;
		const sessionId = req.signedCookies.sessionId;
		const currentSession = await Session.findById(sessionId);

		if (!currentSession) {
			res.status(400).json({
				success: false,
				message: "Session not found",
			});
		}
		const findExisted = currentSession.cart.find((item) => {
			return item.id === id;
		});

		if (findExisted !== undefined) {
			let subDoc = currentSession.cart.id(id);
			subDoc.set({ qty: subDoc.qty + qty });
			subDoc.set({ total: productPrice * subDoc.qty });
			await currentSession.save();
		} else {
			await Session.updateOne(
				{ _id: sessionId },
				{
					$push: {
						cart: { _id: id, qty, size, total: productPrice },
					},
				}
			);
		}
		const thisSession = await Session.findById(sessionId).populate(
			"cart._id"
		);
		res.status(200).json(getCartUtil(thisSession));
	}
	async getCart(req, res, next) {
		try {
			const sessionId = req.signedCookies.sessionId;
			const thisSession = await Session.findById(sessionId).populate(
				"cart._id"
			);
			res.status(200).json(getCartUtil(thisSession));
		} catch (err) {
			res.status(400).json({ success: false, message: err });
		}
	}
	async deleteProduct(req, res, next) {
		const { productId } = req.params;
		try {
			const sessionId = req.signedCookies.sessionId;
			const currentSession = await Session.findById(sessionId);
			let subDoc = currentSession.cart.id(productId);
			if (subDoc) {
				subDoc.remove();
				await currentSession.save();
			}

			const thisSession = await Session.findById(sessionId).populate(
				"cart._id"
			);

			res.status(200).json(getCartUtil(thisSession));
		} catch (err) {
			console.log(err);
			res.status(400).json({
				success: false,
				message: err,
			});
		}
	}
}

module.exports = new CartController();
