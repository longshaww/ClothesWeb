const mongoose = require("mongoose");

const Bills = new mongoose.Schema(
	{
		userID: String,
		displayName: Object,
		listProduct: Array,
		address: String,
		paymentMethod: String,
		request: String,
		status: String,
	},
	{
		timestamps: true,
		collection: "Bills",
		versionKey: false,
	}
);

module.exports = mongoose.model("Bills", Bills);
