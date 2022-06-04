const Bill = require("../../models/Bills");
const Customer = require("../../models/Customers");
const Session = require("../../models/Sessions");
const User = require("../../models/User");

class BillController {
	validateCustomerDIff() {}
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
				const updateCus = await Customer.findById(
					thisUser.customer
				);
				if (
					updateCus.nameCustomer !== nameCustomer ||
					updateCus.email !== email ||
					updateCus.phoneNumber !== phoneNumber ||
					updateCus.address !== address
				) {
					const newCustomer = await Customer.create({
						nameCustomer,
						email,
						phoneNumber,
						address,
						userID: thisUser.id,
					});
					customerID = newCustomer.id;
				} else {
					customerID = thisUser.customer;
					updateCus.userID = thisUser.id;

					await updateCus.save();
				}
			} else {
				const newCustomer = await Customer.create({
					nameCustomer,
					email,
					phoneNumber,
					address,
				});
				customerID = newCustomer.id;
			}

			const newBill = new Bill();
			newBill.customerID = customerID;
			newBill.listProduct = listProduct;
			newBill.paymentMethod = paymentMethod;
			newBill.status = true;
			await newBill.save();

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
