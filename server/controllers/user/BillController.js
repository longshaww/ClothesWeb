const Bill = require("../../models/Bills");
const Customer = require("../../models/Customers");
const Session = require("../../models/Sessions");
const User = require("../../models/User");

class BillController {
	async postBill(req, res, next) {
		const sessionId = req.signedCookies.sessionId;
		let customerID;
		try {
			const {
				userID,
				nameCustomer,
				email,
				phoneNumber,
				address,
				paymentMethod,
				listProduct,
			} = req.body;

			if (userID) {
				const thisUser = await User.findById(userID);
				customerID = thisUser.customer;
			} else {
				const newCustomer = await Customer.create({
					nameCustomer,
					email,
					phoneNumber,
					address,
				});
				customerID = newCustomer.id;
			}

			const newBill = await Bill.create({
				customerID: customerID,
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
