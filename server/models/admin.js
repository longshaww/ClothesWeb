const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
	{
		fullNameCustomer: Object,
		dateOfBirth: String,
		sex: String,
		identityCardNumber: String,
		address: String,
		phoneNumber: String,
		email: String,
		loginInformation: Object,
		avatar: String,
	},
	{
		timestamps: true,
		collection: "Admin",
		versionKey: false,
	}
);

module.exports = mongoose.model("Admin", Admin);
