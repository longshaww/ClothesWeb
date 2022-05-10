const mongoose = require("mongoose");

const Customers = new mongoose.Schema(
	{
		nameCustomer: Object,
		dateOfBirth: Date,
		gender: Boolean,
		phoneNumber: String,
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
