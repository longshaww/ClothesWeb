const Products = require("../../models/Product");

class AndroidController {
	async getAllProduct(req, res, next) {
		const newArrivals = await Products.find();
		newArrivals
			? res.status(202).json(newArrivals)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}

	async getAllNewArrivals(req, res, next) {
		const collectionId = "6295e2c2edafd2b5ebe66cd3";
		const newArrivals = await Products.find({
			"description.collection": collectionId,
		});
		newArrivals
			? res.status(202).json(newArrivals)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}
	async getAllTops(req, res, next) {
		const collectionId = "621c506fbae8653bcb4564ac";
		const tops = await Products.find({
			"description.collection": collectionId,
		});
		tops
			? res.status(202).json(tops)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}

	async getAllBottoms(req, res, next) {
		const collectionId = "621c50a7bae8653bcb4564b1";
		const bottoms = await Products.find({
			"description.collection": collectionId,
		});
		bottoms
			? res.status(202).json(bottoms)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}
	async getAllAccessories(req, res, next) {
		const collectionId = "621c50e0bae8653bcb4564b4";
		const accessories = await Products.find({
			"description.collection": collectionId,
		});
		accessories
			? res.status(202).json(accessories)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}
	async getAllOuterwears(req, res, next) {
		const collectionId = "621c50c7bae8653bcb4564b3";
		const outerwears = await Products.find({
			"description.collection": collectionId,
		});
		outerwears
			? res.status(202).json(outerwears)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}
}

module.exports = new AndroidController();
