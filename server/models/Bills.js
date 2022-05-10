const mongoose = require("mongoose");
const Customer = require("./Customers");
const Products = require("./Product");
const { Schema } = mongoose;

const Bills = new mongoose.Schema(
	{
		userID: String,
		customerID: {
			type: Schema.Types.ObjectId,
			ref: "Customers",
			required: true,
		},
		listProduct: [
			{ type: Schema.Types.ObjectId, ref: "Products", required: true },
		],
		paymentMethod: {
			type: String,
			required: true,
			enum: ["COD", "Online"],
		},
		status: { type: Boolean, required: true },
	},
	{
		timestamps: true,
		collection: "Bills",
		versionKey: false,
	}
);

module.exports = mongoose.model("Bills", Bills);
