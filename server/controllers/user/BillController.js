const Bill = require("../../models/Bills");
const Customer = require("../../models/Customers");
const Session = require("../../models/Sessions");

class BillController {
	async postBill(req, res, next) {
		const sessionId = req.signedCookies.sessionId;

		try {
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
			const currentSession = await Session.findById(sessionId);
			currentSession.cart = [];
			currentSession.save();
			res.status(201).json(newBill);
		} catch (err) {
			res.status(400).send(err);
		}
	}
}

module.exports = new BillController();
