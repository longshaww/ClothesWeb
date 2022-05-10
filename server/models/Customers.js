const mongoose = require("mongoose");

const Customers = new mongoose.Schema(
	{
		nameCustomer: { type: String, required: true },
		address: { type: String, required: true },
		email: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		isRegister: { type: Boolean, required: true, default: false },
		dateOfBirth: Date,
		gender: Boolean,
		listProduct: Array,
		loginInformation: Object,
		avatar: String,
	},
	{
		timestamps: true,
		collection: "Customers",
		versionKey: false,
	}
);

module.exports = mongoose.model("Customers", Customers);
