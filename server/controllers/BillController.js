const Bill = require("../models/Bills");
const Customer = require("../models/Customers");

class BillController {
	async postBill(req, res, next) {
		const {
			nameCustomer,
			email,
			phoneNumber,
			address,
			paymentMethod,
			listProduct,
		} = req.body;
		const newCustomer = await Customer.create({
			nameCustomer,
			email,
			phoneNumber,
			address,
		});
		const newBill = await Bill.create({
			customerID: newCustomer.id,
			listProduct,
			paymentMethod,
			status: true,
		});
		res.status(201).json(newBill);
	}
}

module.exports = new BillController();
