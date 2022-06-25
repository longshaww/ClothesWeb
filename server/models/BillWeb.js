const mongoose = require("mongoose");
const UserWeb = require("../models/UserWeb");
const DeliveryInfo = require("../models/DeliveryInfo");
const Vouchers = require("../models/Vouchers");
const { Schema } = mongoose;

const BillWeb = new mongoose.Schema(
	{
		userID: { type: Schema.Types.ObjectId, ref: "UserWeb" },
		deliveryID: {
			type: Schema.Types.ObjectId,
			ref: "DeliveryInfo",
		},
		voucherID: { type: Schema.Types.ObjectId, ref: "Vouchers" },
		listProduct: [
			{
				_id: {
					type: Schema.Types.ObjectId,
					ref: "Products",
					required: true,
				},
				size: { type: String, required: true },
				qty: { type: Number, required: true },
				sum: { type: Number, required: true },
			},
		],
		qtyProduct: { type: Number, required: true },
		total: { type: Number, required: true },
		paymentMethod: {
			type: String,
			required: true,
			enum: ["COD", "Online"],
		},
		status: { type: Boolean, required: true },
	},
	{
		timestamps: true,
		collection: "BillWeb",
		versionKey: false,
	}
);

module.exports = mongoose.model("BillWeb", BillWeb);
