const mongoose = require("mongoose");
const Types = require("./Types");
const Collections = require("./Collections");

const Products = new mongoose.Schema(
	{
		nameProduct: String,
		size: Array,
		price: Number,
		description: {
			imageList: Array,
			productDes: String,
			price: Number, // Number
			type: { type: String},
			collection: {
				type: String
			},
		},
		discount: Object,
	},
	{
		timestamps: true,
		collection: "Products",
		versionKey: false,
	}
);

module.exports = mongoose.model("Products", Products);
