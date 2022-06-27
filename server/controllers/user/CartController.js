const Session = require("../../models/Sessions");
const Product = require("../../models/Product");
const getCartUtil = require("../../utils/cart.util");
class CartController {
	async addToCart(req, res, next) {
		let { id, qty, size } = req.body;
		const product = await Product.findById(id);
		const productPrice = product.price;
		const sessionId = req.signedCookies.sessionId;
		if (!sessionId) {
			return res.status(400).json({
				success: false,
				message: "Session không được định nghĩa",
			});
		}
		const currentSession = await Session.findById(sessionId);
		if (!currentSession) {
			return res.status(400).json({
				success: false,
				message: "Session đã bị xóa",
			});
		}

		const findExisted = currentSession.cart.find((item) => {
			return item.id === id;
		});

		if (findExisted !== undefined) {
			let subDoc = currentSession.cart.id(id);
			if (subDoc.size !== size) {
				let newSize = `${subDoc.size},${size}`;
				subDoc.set({ size: newSize });
			}
			subDoc.set({
				qty: subDoc.qty + qty,
				total: productPrice * subDoc.qty,
			});
		} else {
			currentSession.cart.push({
				_id: id,
				qty,
				size,
				total: productPrice,
			});
		}
		await currentSession.save();

		const thisSession = await Session.findById(sessionId).populate(
			"cart._id"
		);
		res.status(200).json(getCartUtil(thisSession));
	}
	async getCart(req, res, next) {
		try {
			const sessionId = req.signedCookies.sessionId;
			if (!sessionId) {
				return res.status(400).json({
					success: false,
					message: "Session không được định nghĩa",
				});
			}
			const thisSession = await Session.findById(sessionId).populate(
				"cart._id"
			);
			if (!thisSession) {
				const session = await Session.create({});
				return res
					.status(400)
					.cookie("sessionId", session.id, {
						signed: true,
					})
					.json({
						success: false,
						message: "Session đã bị xóa",
					});
			}

			res.status(200).json(getCartUtil(thisSession));
		} catch (err) {
			res.status(400).json({ success: false, message: err.message });
		}
	}
	async deleteProduct(req, res, next) {
		const { productId } = req.params;
		try {
			const sessionId = req.signedCookies.sessionId;
			if (!sessionId) {
				return res.status(400).json({
					success: false,
					message: "Session không được định nghĩa",
				});
			}
			const currentSession = await Session.findById(sessionId);
			if (!currentSession) {
				return res.status(400).json({
					success: false,
					message: "Session đã bị xóa",
				});
			}
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
