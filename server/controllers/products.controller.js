const { ProductsSchema } = require("../models/models");
// const cloudinary = require("../utils/cloudinary");

class Products {
	async getProducts(req, res) {
		try {
			const products = await ProductsSchema.find();
			res.status(200).json(products);
		} catch (error) {
			res.status(500).json(error);
		}
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

module.exports = new Products();
