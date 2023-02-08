const mongoose = require("mongoose");
const UserWeb = require("./UserWeb");
const { Schema } = mongoose;

const Vouchers = new mongoose.Schema(
	{
		discount: { type: Number, required: true },
		dateStart: { type: Date, required: true },
		dateEnd: { type: Date, required: true },
		maxDiscount: { type: Number, required: true },
		qualifyAmount: { type: Number, required: true },
		qty: { type: Number, required: true },
		listUser: [{ type: Schema.Types.ObjectId, ref: "UserWeb" }],
	},
	{
		timestamps: true,
		collection: "Vouchers",
		versionKey: false,
	}
);

module.exports = mongoose.model("Vouchers", Vouchers);
