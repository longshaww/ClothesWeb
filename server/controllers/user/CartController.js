const Session = require("../../models/Sessions");
const Product = require("../../models/Product");
const getCartUtil = require("../../utils/cart.util");
class CartController {
	async addToCart(req, res, next) {
		let { idProduct, qty, size, img, name, price } = req.body;
		const product = await Product.findById(idProduct);
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

		const productExisted = currentSession.cart.find((item) => {
			return item.idProduct.equals(idProduct);
		});
		if (!productExisted) {
			currentSession.cart.push({
				idProduct,
				qty,
				size,
				total: productPrice,
				img,
				name,
				price,
			});
		} else {
			if (size !== productExisted.size) {
				currentSession.cart.push({
					idProduct,
					qty,
					size,
					total: productPrice,
					img,
					name,
					price,
				});
			} else {
				productExisted.set({
					qty: productExisted.qty + qty,
					total: productPrice * (productExisted.qty + qty),
				});
			}
		}
		res.status(200).json(getCartUtil(await currentSession.save()));
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
			const thisSession = await Session.findById(sessionId);
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
		const { idProduct } = req.params;
		const { size } = req.body;
		try {
			if (!idProduct) {
				return res.status(404).json({
					success: false,
					message: "Lỗi không có param",
				});
			}
			if (!size) {
				return res.status(404).json({
					success: false,
					message: "Thiếu size",
				});
			}
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
			let subDoc = currentSession.cart.find(
				(item) =>
					item.idProduct.equals(idProduct) && item.size === size
			);
			if (!subDoc) {
				return res
					.status(404)
					.json({ success: false, message: "Not found" });
			}
			subDoc.remove();
			res.status(200).json(getCartUtil(await currentSession.save()));
		} catch (err) {
			res.status(400).json({
				success: false,
				message: err.message,
			});
		}
	}
}

module.exports = new CartController();
