const ProductObject = require('../../services/user/collections/products');
const validator = require('../../utils/validator');
class ProductController {
    async getProductDetail(req, res, next) {
        try {
            const id = req.params.id;
            const productObject = new ProductObject(id);
            const detailProduct = await productObject.getProductDetail();
            validator(detailProduct, 'isEmpty')
                ? res.status(200).json(detailProduct)
                : res.status(404).send(' Data eror ');
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
}

module.exports = new ProductController();
