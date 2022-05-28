const Products = require("../../models/Product");
var ObjectId = require("mongodb").ObjectId;
const pageSize = 12;
class CollectionsController {
	async getAllProduct(req, res, next) {
		const selection = req.body.selection;
		const pageNow = parseInt(req.query.page);
		const skip = (pageNow - 1) * pageSize;
		const newArrivals = await Products.find().skip(skip).limit(pageSize);
		newArrivals
			? res.status(202).json(newArrivals)
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
	}

	//[GET] collections without pagination
	async getAllProductWithOutPagination(req, res, next) {
		const selection = req.body.selection;
		const newArrivals = await Products.find();
		newArrivals
			? res.status(202).json(newArrivals)
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
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
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
	}

	//[GET] collections/new-arrivals without pagination

	async getAllNewArrivalsWithOutPagination(req, res, next) {
		const idFake = "621e4d91df99d34d865f9e55";
		const newArrivals = await Products.find({
			"description.collection": idFake,
		});
		newArrivals
			? res.status(202).json(newArrivals)
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
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
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
	}

	//[GET] collections/tops without pagination

	async getAllTopsWithOutPag(req, res, next) {
		const idFake = "621c506fbae8653bcb4564ac";
		const tops = await Products.find({
			"description.collection": idFake,
		});
		tops
			? res.status(202).json(tops)
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
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
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
	}

	//[GET] collections/bottoms without pagination
	async getAllBottomsWithOutPag(req, res, next) {
		const idFake = "621c50a7bae8653bcb4564b1";
		const bottoms = await Products.find({
			"description.collection": idFake,
		});
		bottoms
			? res.status(202).json(bottoms)
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
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
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
	}

	//[GET] collections/accessories without pagination

	async getAllAccessoriesWithOutPag(req, res, next) {
		const idFake = "621c50e0bae8653bcb4564b4";
		const accessories = await Products.find({
			"description.collection": idFake,
		});
		accessories
			? res.status(202).json(accessories)
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
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
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
	}

	//[GET] collections/Outerwears without pagination
	async getAllOuterwearsWithOutPagination() {
		const outerwears = await Products.find({
			"description.collection": idFake,
		});
		outerwears
			? res.status(202).json(outerwears)
			: res.status(404).json({
				success : false,
				msg : "NOT HAVE DATA"
			});
	}

	async getHomeNewArrivals(req,res,next)
	{
			// data fake
			const idFake = "621e4d91df99d34d865f9e55";
			let listProduct = [];
			const product = await Products.find({
				"description.collection": idFake,
			})
			for(var i =0 ; i < 15 ; i ++)
			{
				listProduct.push(product[i]);
			}
			res.json({
				success : true,
				products : listProduct
			})

			
	}


	// GETNEWARRIVALS 15 PRODUCTS  
	async  get15NewArrivals(req,res)
	{
		const idFake = "621e4d91df99d34d865f9e55";
		const newArrivals = await Products.find({
			"description.collection": idFake,
		})
		const listProduct = await newArrivals.splice(8,6)
		res.send({
			success: true,
			 listProduct
		})

	}
}

module.exports = new CollectionsController();
