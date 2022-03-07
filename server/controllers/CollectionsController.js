const Products = require("../models/Product");
var ObjectId = require("mongodb").ObjectId;
const pageSize = 12;
class CollectionsController {
	async getAllProduct(req, res, next) {
		const selection = req.body.selection;

		// data fak
		const newArrivals = await Products.find();
		newArrivals
			? res.status(202).json(newArrivals)
			: res.status(404).send("<h1>Không có dữ liệu</h1>");
	}

	//[GET] collections/new-arrivals
	async getAllNewArrivals(req, res, next) {
		const pageNow = parseInt(req.query.page);
		const skip = (pageNow - 1) * pageSize;

		// data user click id  collection  new arrivals
		const selection = req.body.selection;
		// data fake
		const idFake = "621e4d91df99d34d865f9e55";
		const newArrivals = await Products.find({
			"description.collection": idFake,
		})
			.skip(skip)
			.limit(pageSize);
		newArrivals
			? res.status(202).json(newArrivals)
			: res.status(404).send("<h1>Không có dữ liệu</h1>");
	}

	//[GET] collections/tops
	async getAllTops(req, res, next) {
		const pageNow = parseInt(req.query.page);
		const skip = (pageNow - 1) * pageSize;

		// data user click id  collection  new arrivals
		const selection = req.body.selection;
		// data fake
		const idFake = "621c506fbae8653bcb4564ac";
		const tops = await Products.find({
			"description.collection": idFake,
		})
			.skip(skip)
			.limit(pageSize);
		tops
			? res.status(202).json(tops)
			: res.status(404).send("<h1>Không có dữ liệu</h1>");
	}

	//[GET] collections/bottoms
	async getAllBottoms(req, res, next) {
		const pageNow = parseInt(req.query.page);
		const skip = (pageNow - 1) * pageSize;
		// data user click id  collection  new arrivals
		const selection = req.body.selection;
		// data fake
		const idFake = "621c50a7bae8653bcb4564b1";
		const bottoms = await Products.find({
			"description.collection": idFake,
		})
			.skip(skip)
			.limit(pageSize);
		bottoms
			? res.status(202).json(bottoms)
			: res.status(404).send("<h1>Không có dữ liệu</h1>");
	}

	//[GET] collections/accessories
	async getAllAccessories(req, res, next) {
		const pageNow = parseInt(req.query.page);
		const skip = (pageNow - 1) * pageSize;
		// data user click id  collection  new arrivals
		const selection = req.body.selection;
		// data fake
		const idFake = "621c50e0bae8653bcb4564b4";
		const accessories = await Products.find({
			"description.collection": idFake,
		})
			.skip(skip)
			.limit(pageSize);
		accessories
			? res.status(202).json(accessories)
			: res.status(404).send("<h1>Không có dữ liệu</h1>");
	}

	//[GET] collections/Outerwears
	async getAllOuterwears(req, res, next) {
		const pageNow = parseInt(req.query.page);
		const skip = (pageNow - 1) * pageSize;
		// data user click id  collection  new arrivals
		const selection = req.body.selection;
		// data fake
		const idFake = "621c50c7bae8653bcb4564b3";
		const outerwears = await Products.find({
			"description.collection": idFake,
		})
			.skip(skip)
			.limit(pageSize);
		outerwears
			? res.status(202).json(outerwears)
			: res.status(404).send("<h1>Không có dữ liệu</h1>");
	}
}

module.exports = new CollectionsController();
