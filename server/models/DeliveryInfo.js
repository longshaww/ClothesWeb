const mongoose = require("mongoose");
const { Schema } = mongoose;

const DeliveryInfo = new mongoose.Schema(
	{
		nameCustomer: { type: String, required: true },
		address: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		userID: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
		collection: "DeliveryInfo",
		versionKey: false,
	}
);

module.exports = mongoose.model("DeliveryInfo", DeliveryInfo);
