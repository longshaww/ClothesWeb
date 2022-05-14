const mongoose = require("mongoose");
const Customer = require("./Customers");
const { Schema } = mongoose;

const User = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		dateOfBirth: Date,
		gender: Boolean,
		avatar: String,
		customer: { type: Schema.Types.ObjectId, ref: "Customers" },
		isAdmin: { type: Boolean, required: true, default: false },
	},
	{
		timestamps: true,
		collection: "User",
		versionKey: false,
	}
);

module.exports = mongoose.model("User", User);
