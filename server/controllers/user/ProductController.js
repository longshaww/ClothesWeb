const ProductsModel = require("../../models/Product");
// const cloudinary = require("../utils/cloudinary");

class ProductController {

	async getProductDetail(req, res, next) {
		const id = req.params.id;
		const detailProduct = await ProductsModel.findById(id);
		
		detailProduct
			? res.status(202).json(detailProduct)
			: res.status(404).send(" Data eror ");
	}


}

module.exports = new ProductController();
