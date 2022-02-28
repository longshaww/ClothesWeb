const mongoose = require("mongoose");

const discount = new mongoose.Schema(
	{
		percent: Number,
		dateStart: Date,
		dateEnd: Date,
	},
	{
		timestamps: true,
		collection: "discount",
		versionKey: false,
	}
);

module.exports = mongoose.model("discount", discount, "discount");
