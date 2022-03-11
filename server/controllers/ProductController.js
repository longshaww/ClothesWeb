const ProductsModel = require("../models/Product");
// const cloudinary = require("../utils/cloudinary");

class ProductController {
	//[GET]
	//Ngọc Phú
	async getProductDetail(req, res, next) {
		const id = req.params.id;
		const detailProduct = await ProductsModel.findById(id);
		detailProduct
			? res.status(202).json(detailProduct)
			: res.status(404).send("<h1> Data eror </h1>");
	}
}

// const postRoom = async (req, res) => {
// 	var image = await cloudinary.uploader.unsigned_upload(
// 		req.file.path,
// 		"oeaxhoph"
// 	);
// 	req.body.image = image.secure_url;
// 	try {
// 		const room = await Rooms.create(req.body);
// 		res.json(room);
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// };

module.exports = new ProductController();
