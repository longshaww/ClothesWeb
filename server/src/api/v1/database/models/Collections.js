const mongoose = require("mongoose");

const Collections = new mongoose.Schema(
	{
		typeName: {
			type: String,
			enum: ["Tops", "Bottoms", "Outerwears", "Accessories"],
		},
	},
	{
		timestamps: true,
		collection: "Collections",
		versionKey: false,
	}
);

module.exports = mongoose.model("Collections", Collections);
