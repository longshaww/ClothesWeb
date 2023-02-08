const mongoose = require("mongoose");

const Types = new mongoose.Schema(
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
		collection: "Types",
		versionKey: false,
	}
);

module.exports = mongoose.model("Types", Types);
