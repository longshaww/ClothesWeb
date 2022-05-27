const Session = require("../../models/Sessions");
const Product = require("../../models/Product");
class CartController {
	async addToCart(req, res, next) {
		// Nhận dữ liệu từ client
		let { id, qty, size } = req.body;
		//Tìm sản phẩm có id được gửi từ client
		const product = await Product.findById(id);
		// Lấy ra giá của sản phẩm đó
		const productPrice = product.price;
		//Lấy sessionId được gửi từ phía client
		const sessionId = req.signedCookies.sessionId;
		//Tìm trong DB sessionId trùng với sessionId ở trên
		const currentSession = await Session.findById(sessionId);

		// Tìm sản phẩm đã tồn tại trong giỏ hàng dựa trên Id nhận được
		const findExisted = currentSession.cart.find((item) => {
			return item.id === id;
		});

		// Nếu đã có sản phẩm đó trong giỏ hàng
		if (findExisted !== undefined) {
			// Truy cập vào giỏ hàng chứa sản phẩm có id là = id từ client
			let subDoc = currentSession.cart.id(id);
			//set thuộc tính qty của giỏ hàng hiện tại + qty được gửi từ client
			subDoc.set({ qty: subDoc.qty + qty });
			// set thuộc tính total = giá sản phẩm ban đầu * số lượng sản phẩm trong giỏ
			subDoc.set({ total: productPrice * subDoc.qty });
			// Lưu data vừa thay đổi vào DB
			await currentSession.save();
		}
		// Nếu sản phẩm đã tồn tại trong giỏ hàng
		else {
			// Push dữ liệu từ client vào cart
			await Session.updateOne(
				{ _id: sessionId },
				{
					$push: {
						cart: { _id: id, qty, size, total: productPrice },
					},
				}
			);
		}
		// Code response cho client
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
