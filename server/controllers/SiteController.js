<<<<<<< HEAD
const ProductsModel = require("../models/Product");
// const cloudinary = require("../utils/cloudinary");
const product = require("../models/Product");
class SiteController {
	async getProducts(req, res) {
		try {
			const products = await ProductsModel.find()
				.populate("description.type")
				.populate("description.collection");
			res.status(200).json(products);
		} catch (error) {
			res.status(500).json(error);
		}
     
	}

	getAllSite(req,res,next)
	{
		res.send("thanh2 cong");
	}
}


/// LONG /////
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

module.exports = new SiteController();
=======
class SiteController{
    Home(req,res,next)
    {
        res.send("thành công");
    }
}
module.exports = new SiteController;
>>>>>>> 7507dad22799e6cfe59c9dfbb1e9d336d5cfccdb
