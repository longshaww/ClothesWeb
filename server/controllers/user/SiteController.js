const ProductsModel = require("../../models/Product");
const fs = require("fs");
const name = require("../../crawldata/data/datadangkyvitir.json");
// const cloudinary = require("../utils/cloudinary");
const { checkIfNameOrNot } = require("../../utils/function");
const stripe = require("stripe")(
	"sk_test_51KwO8iLbEwIz3CNxDmcyHUOdMcLCUa7UUu5Y7ltmoH8ogGdBSRDoYYwSvrxO1gNt97l6RUMclbvhBN4D5dmTZmMe00no4A2QPu"
);
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
		res.send({
			success: true,
			message: "Welcome to Phu Le and Long Tran server",
		});
	}

	async searchView(req, res, next) {
		const { q, ascending, descending } = req.query;
		let resProduct;
		try {
			const products = await ProductsModel.find();
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
	calculateOrderAmount = (items) => {
		const reduce =
			items.reduce((a, b) => {
				return a + b.sum;
			}, 0) / 23;
		const total = parseInt(reduce.toFixed(2).replace(".", ""));
		return total;
	};
	//[GET] /getLocation
	getLocation(req, res, next) {
		const rawdata = fs.readFileSync(
			"crawldata/data/datadangkyvitir.json"
		);
		const data = JSON.parse(rawdata);

		return res.status(202).send(data);
	}

	async getAllProduct(req, res, next) {
		let listProduct = [];
		const product = await ProductsModel.find({});
		for (var i = 0; i < 15; i++) {
			listProduct.push(product[i]);
		}
		res.json({
			success: true,
			products: listProduct,
		});
	}
	async chargePayment(req, res, next) {
		const { items } = req.body;

		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(items),
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
		});

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
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
