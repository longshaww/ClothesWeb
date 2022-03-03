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
		res.send("Success");
	}
	async searchView(req,res,next)
	{
	
		const nameProduct = await req.query.q
		if(nameProduct)
		{
			const product = await ProductsModel.find({})
			const data =  await product.filter(function(data){
				return data.nameProduct.toLowerCase().indexOf(nameProduct.toLowerCase()) !== -1
			})
			res.status(202).json(data)		
		}
		else
		{
			res.status(404).send("<h1>Không có dữ liệu</h1>")
		}
		
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
