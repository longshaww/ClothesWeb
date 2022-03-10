const mongoose = require("mongoose");
const Products = require("./Product");
const { Schema } = mongoose;

const Sessions = new Schema(
	{
		cart: [
			{
				_id: { type: Schema.Types.ObjectId, ref: "Products" },
				qty: Number,
				size: String,
			},
		],
	},
	{
		timestamps: true,
		collection: "Sessions",
		versionKey: false,
	}
);

module.exports = mongoose.model("Sessions", Sessions);
