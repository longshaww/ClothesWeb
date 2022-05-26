const mongoose = require("mongoose");
const Customer = require("./Customers");
const { Schema } = mongoose;

const User = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		information: {
			name: String,
			phoneNumber: String,
			dateOfBirth: Date,
			gender: Boolean,
			avatar: String,
			address: String,
		},
		isAdmin: { type: Boolean, required: true, default: false },
	},
	{
		timestamps: true,
		collection: "User",
		versionKey: false,
	}
);

module.exports = mongoose.model("User", User);
