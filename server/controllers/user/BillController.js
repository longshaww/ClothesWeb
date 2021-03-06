const DeliveryInfo = require("../../models/DeliveryInfo");
const UserWeb = require("../../models/UserWeb");
const BillWeb = require("../../models/BillWeb");
const Session = require("../../models/Sessions");
class BillController {
	async addNewInfoUser(req, res) {
		const { userID, nameCustomer, address, phoneNumber } = req.body;
		if (!userID || !nameCustomer || !address || !phoneNumber) {
			return res.status(400).json({
				success: false,
				message: "Cannot post without body !",
			});
		}
		try {
			const newDeliveryInfo = await DeliveryInfo.create(req.body);
			res.status(200).json({ success: true, body: newDeliveryInfo });
		} catch (err) {
			res.status(400).json({ success: false, message: err });
		}
	}
	async editInfoUser(req, res) {
		const { id } = req.params;
		const { nameCustomer, address, phoneNumber } = req.body;
		if ((!id, !nameCustomer || !address || !phoneNumber)) {
			return res.status(400).json({
				success: false,
				message: "Cannot post without body !",
			});
		}
		try {
			const deliveryInfo = await DeliveryInfo.findById(id);
			deliveryInfo.nameCustomer = nameCustomer;
			deliveryInfo.address = address;
			deliveryInfo.phoneNumber = phoneNumber;
			res.status(200).json({
				success: true,
				body: await deliveryInfo.save(),
			});
		} catch (err) {
			res.status(400).json({ success: false, message: err });
		}
	}
	async deleteInfoUser(req, res) {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Cannot post without body !",
			});
		}
		try {
			const deliveryInfo = await DeliveryInfo.findByIdAndDelete(id);
			res.status(200).json({ success: true, body: deliveryInfo });
		} catch (err) {
			res.status(400).json({ success: false, message: err });
		}
	}

	async listInfo(req, res) {
		const { userID } = req.body;
		if (!userID) {
			return res.status(400).json({
				success: false,
				message: "Cannot post without body !",
			});
		}
		try {
			const user = await UserWeb.findById(userID);
			const customize = {
				_id: user._id,
				nameCustomer: user.information.name,
				address: user.information.address,
				phoneNumber: user.information.phoneNumber,
			};
			const listInfo = await DeliveryInfo.find({ userID: userID });
			listInfo.unshift(customize);
			res.status(200).json({ success: true, body: listInfo });
		} catch (err) {
			res.status(400).json({ success: false, message: err });
		}
	}

	async getBill(req, res) {
		const { id } = req.params;
		if (!id) {
			return res.status(404).json({
				success: false,
				message: "Cannot post without id",
			});
		}
		try {
			const bill = await BillWeb.findById(id)
				.populate("userID")
				.populate("deliveryID")
				.populate("listProduct._id")
				.populate("voucherID");
			res.status(200).json({
				success: true,
				body: bill,
			});
		} catch (err) {
			res.status(400).json({ success: false, message: err });
		}
	}

	async postBill(req, res) {
		const sessionId = req.signedCookies.sessionId;

		const {
			userID,
			nameCustomer,
			address,
			phoneNumber,
			email,
			listProduct,
			paymentMethod,
			idDelivery,
			voucherID,
			total,
		} = req.body;
		if (
			!nameCustomer ||
			!address ||
			!phoneNumber ||
			!listProduct ||
			!email ||
			!paymentMethod ||
			!total
		) {
			return res.status(400).json({
				success: false,
				message: "Cannot post without body !",
			});
		}
		try {
			const newBillWeb = new BillWeb({
				listProduct,
				paymentMethod,
				total,
				subTotal: listProduct.reduce((a, b) => a + b.sum, 0),
				qtyProduct: listProduct.reduce((a, b) => a + b.qty, 0),
				status: paymentMethod === "COD" ? false : true,
				shippingFee: 35,
			});
			if (voucherID) {
				newBillWeb.voucherID = voucherID;
			}
			if (userID) {
				newBillWeb.userID = userID;
				if (idDelivery) {
					newBillWeb.deliveryID = idDelivery;
				}
			} else {
				const newInfo = await DeliveryInfo.create({
					nameCustomer,
					address,
					phoneNumber,
					email,
				});
				newBillWeb.deliveryID = newInfo.id;
			}

			const currentSession = await Session.findById(sessionId);
			if (currentSession) {
				currentSession.cart = [];
				currentSession.save();
			}
			await newBillWeb.save();
			const billResult = await BillWeb.findById(newBillWeb._id)
				.populate("userID")
				.populate("deliveryID")
				.populate("listProduct._id")
				.populate("voucherID");
			res.status(200).send({
				success: true,
				body: billResult,
			});
		} catch (err) {
			res.status(404).send({ success: false, message: err.message });
		}
	}
}

module.exports = new BillController();
