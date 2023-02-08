const mongoose = require("mongoose");

const Discount = new mongoose.Schema(
	{
		percent: Number,
		dateStart: Date,
		dateEnd: Date,
	},
	{
		timestamps: true,
		collection: "Discount",
		versionKey: false,
	}
);

module.exports = mongoose.model("Discount", Discount);
