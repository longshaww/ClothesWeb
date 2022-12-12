const ProductObject = require('../../services/user/collections/products');
const validator = require('../../utils/validator');
const { throwErr, successRes } = require('../../utils/HandleResponse');
const rateService = require('../../services/user/rate');
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

    async getProductReview(req, res) {
        try {
            const { productID } = req.params;

            if (!productID) return throwErr(res, 403, 'Forbidden');
            const listReview = await rateService.productReview(productID);
            return successRes(res, 200, listReview, 'Get successfully');
        } catch (err) {
            return throwErr(res, 400, err.message);
        }
    }
}

module.exports = new ProductController();
