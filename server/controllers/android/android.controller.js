const Products = require("../../models/Product");

class AndroidController {
	async getAllProduct(req, res, next) {
		const selection = req.body.selection;
		const newArrivals = await Products.find();
		newArrivals
			? res.status(202).json(newArrivals)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}
	async getAllNewArrivals(req, res, next) {
		const idFake = "621e4d91df99d34d865f9e55";
		const newArrivals = await Products.find({
			"description.collection": idFake,
		});
		newArrivals
			? res.status(202).json(newArrivals)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}
	async getAllTops(req, res, next) {
		const idFake = "621c506fbae8653bcb4564ac";
		const tops = await Products.find({
			"description.collection": idFake,
		});
		tops
			? res.status(202).json(tops)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}

	async getAllBottoms(req, res, next) {
		const idFake = "621c50a7bae8653bcb4564b1";
		const bottoms = await Products.find({
			"description.collection": idFake,
		});
		bottoms
			? res.status(202).json(bottoms)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}
	async getAllAccessories(req, res, next) {
		const idFake = "621c50e0bae8653bcb4564b4";
		const accessories = await Products.find({
			"description.collection": idFake,
		});
		accessories
			? res.status(202).json(accessories)
			: res.status(404).json({
					success: false,
					msg: "NOT HAVE DATA",
			  });
	}
	async getAllOuterwears() {
		const outerwears = await Products.find({
			"description.collection": idFake,
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
