const DeliveryInfo = require("../../models/DeliveryInfo");
const UserWeb = require("../../models/UserWeb");
const jwt_decode = require("jwt-decode");

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
			res.status(200).json({ success: true, body: DeliveryInfo });
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
	async postBill(req, res) {}
}

module.exports = new BillController();
