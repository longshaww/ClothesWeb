const mongoose = require("mongoose");

const collections = new mongoose.Schema(
	{
		collectionName: {
			type: String,
			enum: ["Tops", "Bottoms", "Outerwears", "Accessories"],
		},
	},
	{
		timestamps: true,
		collection: "collections",
		versionKey: false,
	}
);

module.exports = mongoose.model("collections", collections, "collections");
