const Bill = require("../../models/Bills");
const Customer = require("../../models/Customers");
const Session = require("../../models/Sessions");
const User = require("../../models/User");

class BillController {
	async addNewInfoUser(req, res) {
		const { nameCustomer, address, email, isRegister, userID } = req.body;
		if (!nameCustomer || !address || !isRegister || !email || !userID) {
			res.status(400).send("Bad request");
		}
		if (!req.body) {
			return res.status(400).send("Bad request");
		}
		try {
			const newCustomer = await Customer.create(req.body);
			res.status(200).json(newCustomer);
		} catch (err) {
			res.status(400).send(err);
		}
	}

	async editInfoUser() {
		const { _id, nameCustomer, address, phoneNumber } = req.body;
		if (!_id || !nameCustomer || !address || !phoneNumber) {
			res.status(400).send("Bad request");
		}
		try {
			const updateCus = await Customer.findById(_id);
			if (!updateCus) {
				return res.status(404).send("Not found");
			}
			updateCus.nameCustomer = nameCustomer;
			updateCus.address = address;
			updateCus.phoneNumber = phoneNumber;
			const newCus = await updateCus.save();
			res.status(200).json(newCus);
		} catch (err) {
			res.status(400).send(err);
		}
	}

	async deleteInfoUser() {
		const { _id } = req.body;
		if (!_id) {
			res.status(400).send("Bad request");
		}
		try {
			const deleteCustomer = await Customer.findOneAndDelete({
				id: _id,
			});
			res.status(200).json(deleteCustomer);
		} catch (err) {
			res.status(400).send(err);
		}
	}

	async getListInfoUser(req, res) {
		const { userID } = req.body;
		if (!userID) {
			return res.status(400).send("Bad request");
		}
		try {
			const listInfo = await Customer.find({ userID });
			res.status(200).json(listInfo);
		} catch (err) {
			res.status(400).send(err);
		}
	}
	async getBillHistory(req, res) {
		let bills;
		const { userID } = req.body;

		if (!userID) {
			return res.status(400).send("Bad request");
		}
		try {
			const customers = await Customer.find({
				userID,
			});
			for (let customer of customers) {
				bills = await Bill.find({ customer: customer.id });
			}
			res.status(200).json(bills);
		} catch (err) {
			res.status(400).send(err);
		}
	}

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
					updateCus.phoneNumber !== phoneNumber ||
					updateCus.address !== address
				) {
					const newCustomer = await Customer.findOne({
						nameCustomer,
						phoneNumber,
						address,
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
			newBill.total = listProduct.reduce((a, b) => a + b.sum, 0);
			newBill.qtyProduct = listProduct.reduce((a, b) => a + b.qty, 0);
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
