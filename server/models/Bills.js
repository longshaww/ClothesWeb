const mongoose = require("mongoose");

const bills = new mongoose.Schema(
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
		collection: "bills",
		versionKey: false,
	}
);

module.exports = mongoose.model("bills", bills, "bills");
