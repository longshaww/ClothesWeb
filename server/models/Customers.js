const mongoose = require("mongoose");

const Customers = new mongoose.Schema(
	{
		nameCustomer: Object,
		dateOfBirth: String,
		sex: String,
		identityCardNumber: String,
		address: String,
		phoneNumber: String,
		email: String,
		listProduct: Array,
		loginInformation: Object,
		avatar: String,
	},
	{
		timestamps: true,
		collection: "customers",
		versionKey: false,
	}
);

module.exports = mongoose.model("Customers", Customers);
