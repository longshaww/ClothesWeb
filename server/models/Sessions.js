const mongoose = require("mongoose");
const Products = require("./Product");
const { Schema } = mongoose;

const Sessions = new Schema(
	{
		cart: [{ type: Schema.Types.ObjectId, ref: "Products" }],
	},
	{
		timestamps: true,
		collection: "Sessions",
		versionKey: false,
	}
);

module.exports = mongoose.model("Sessions", Sessions);
