const mongoose = require("mongoose");
const { Schema } = mongoose;

const Vouchers = new mongoose.Schema(
	{
		discount: { type: Schema.Types.Number, required: true },
		dateStart: { type: Schema.Types.Date, required: true },
		dateEnd: { type: Schema.Types.Date, required: true },
		maxDiscount: { type: Schema.Types.Number, required: true },
		qualifyAmount: { type: Schema.Types.Number, required: true },
		qty: { type: Schema.Types.Number, required: true },
		listUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{
		timestamps: true,
		collection: "Vouchers",
		versionKey: false,
	}
);

module.exports = mongoose.model("Vouchers", Vouchers);
