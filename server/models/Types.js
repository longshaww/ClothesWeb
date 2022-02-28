const mongoose = require("mongoose");

const types = new mongoose.Schema(
	{
		typeName: {
			typeName: String,
			enum: [
				"Tee",
				"Jacket",
				"Sweater",
				"Pant",
				"Short",
				"Hoodie",
				"Varsity",
			],
		},
		status: Boolean,
	},
	{
		timestamps: true,
		collection: "types",
		versionKey: false,
	}
);

module.exports = mongoose.model("types", types, "types");
