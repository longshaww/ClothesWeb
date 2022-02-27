const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
	{
		name: String,
		// in high club corlor not have different color
		color: {
			type: String,
			enum: ["Red", "Black", "White", "Green", "Blue", "Pink"],
		},
		// type in  hight club divide into collections 
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
		image: Array,
		description: String,
	},
	{
		collection: "Products",
	}
);

const ProductsSchema = mongoose.model("Products", productsSchema, "Products");

module.exports = {
	ProductsSchema,
};
