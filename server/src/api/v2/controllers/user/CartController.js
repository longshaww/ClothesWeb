const Session = require('../../models/Sessions');
const Product = require('../../models/Product');
const { getCartUtil } = require('../../utils/helper.js');
class CartController {
    async changeQty(req, res, next) {
        try {
            const { idProduct, qty, size } = req.body;
            const product = await Product.findById(idProduct);
            const productPrice = product.price;
            const productSize = product.size.find((s) => s.sizeName === size);
            const currentSession = res.locals.session;
            const productExisted = currentSession.cart.find((item) => {
                return item.idProduct.equals(idProduct) && item.size === size;
            });
            if (!productExisted) return;
            if (productExisted.qty <= 1 && qty === -1) {
                productExisted.remove();
                return res.status(200).json(getCartUtil(await currentSession.save()));
            }
            if (productExisted.qty >= productSize.qty && qty === 1) {
                return res.status(400).json({
                    success: false,
                    message: `${productExisted.name} chỉ còn ${productSize.qty} sản phẩm`,
                });
            }
            productExisted.set({
                qty: productExisted.qty + qty,
                total: productPrice * (productExisted.qty + qty),
            });
            res.status(200).json(getCartUtil(await currentSession.save()));
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    async addToCart(req, res, next) {
        try {
            let { idProduct, qty, size, img, name, price } = req.body;
            const product = await Product.findById(idProduct);
            const productPrice = product.price;
            const currentSession = res.locals.session;
            const productExisted = currentSession.cart.find((item) => {
                return item.idProduct.equals(idProduct) && item.size === size;
            });
            const productSize = product.size.find((s) => s.sizeName === size);

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
                if (productExisted.qty >= productSize.qty)
                    return res.status(400).json({
                        success: false,
                        message: `${productExisted.name} chỉ còn ${productSize.qty} sản phẩm`,
                    });
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
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    async getCart(req, res, next) {
        try {
            const sessionId = res.locals.session;
            res.status(200).json(getCartUtil(sessionId));
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    async deleteProduct(req, res, next) {
        const { idProduct } = req.params;
        const { size } = req.body;
        try {
            const currentSession = res.locals.session;
            if (!idProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Lỗi không có param',
                });
            }
            if (!size) {
                return res.status(404).json({
                    success: false,
                    message: 'Thiếu size',
                });
            }
            let subDoc = currentSession.cart.find(
                (item) => item.idProduct.equals(idProduct) && item.size === size
            );
            if (!subDoc) {
                return res.status(404).json({ success: false, message: 'Not found' });
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
