const mongoose = require("mongoose");
const Customer = require("./Customers");
const { Schema } = mongoose;

const UserWeb = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		information: {
			name: { type: String, required: true },
			phoneNumber: { type: String, required: true },
			dateOfBirth: Date,
			gender: { type: Boolean, required: true },
			address: { type: String, required: true }
		},
		isAdmin: { type: Boolean, required: true, default: false },
		myPoint : {type : Number , required : true , default : 0 }
 	},
	{
		timestamps: true,
		collection: "UserWeb",
		versionKey: false,
	}
);

module.exports = mongoose.model("UserWeb", UserWeb);
