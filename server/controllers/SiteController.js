const ProductsModel = require("../models/Product");
const fs = require("fs");
const name = require("../crawldata/data/datadangkyvitir.json");
// const cloudinary = require("../utils/cloudinary");

function checkIfNameOrNot(ascending, descending, list) {
	if (ascending === "true") {
		list.sort((a, b) => {
			return a.price - b.price;
		});
	}
	if (descending === "true") {
		list.sort((a, b) => {
			return b.price - a.price;
		});
	}
	return list;
}
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

	getAllSite(req, res, next) {
		res.send("Success");
	}

	async searchView(req, res, next) {
		const { q, ascending, descending } = req.query;
		let resProduct;
		try {
			const products = await ProductsModel.find();
			console.log(req.query);
			if (q) {
				const filteredProduct = products.filter((product) => {
					return (
						product.nameProduct
							.toLowerCase()
							.indexOf(q.toLowerCase()) !== -1
					);
				});
				resProduct = checkIfNameOrNot(
					ascending,
					descending,
					filteredProduct
				);
			}
			if (!q || q === "") {
				resProduct = checkIfNameOrNot(
					ascending,
					descending,
					products
				);
			}

			res.status(202).send(resProduct);
		} catch (err) {
			res.status(404).send("<h1>Không có dữ liệu </h1>");
			throw new Error(err);
		}
	}
	//[GET] /getLocation
	getLocation(req, res, next) {
		const rawdata = fs.readFileSync(
			"crawldata/data/datadangkyvitir.json"
		);
		const data = JSON.parse(rawdata);

		return res.status(202).send(data);
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
