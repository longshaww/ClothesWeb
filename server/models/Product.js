const mongoose = require("mongoose");

const Products = new mongoose.Schema(
	{
		nameProduct: String,
		size: Array,
		price: Number,
		description: Object,
		discount: Object,
	},
	{
		timestamps: true,
		collection: "products",
		versionKey: false,
	}
);

module.exports = mongoose.model("Products", Products, "Products");
