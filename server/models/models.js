const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
	{
		name: String,
		color: {
			type: String,
			enum: ["Red", "Black", "White", "Green", "Blue", "Pink"],
		},
		type: {
			type: String,
			enum: ["Tee,Jacket,Sweater,Pant,Short,Hoodie,Varsity"],
		},
		collections: {
			type: String,
			enum: ["Tops", "Bottoms", "Outerwears,Accessories,Sale"],
		},
		price: Number,
		quantity: Number,
		image: String,
	},
	{
		collection: "Products",
	}
);

const ProductsSchema = mongoose.model("Products", productsSchema, "Products");

module.exports = {
	ProductsSchema,
};
