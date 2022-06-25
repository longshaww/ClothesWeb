const Voucher = require("../../models/Vouchers");

class VoucherController {
	async createVoucher(req, res) {
		const {
			discount,
			dateStart,
			dateEnd,
			maxDiscount,
			qualifyAmount,
			qty,
		} = req.body;
		if (
			!discount ||
			!dateStart ||
			!dateEnd ||
			!maxDiscount ||
			!qualifyAmount ||
			!qty
		) {
			return res.status(400).json({
				success: false,
				message: "Cannot post without body",
			});
		}
		try {
			const newVoucher = await Voucher.create(req.body);
			res.status(200).json({ success: true, body: newVoucher });
		} catch (err) {
			res.status(400).json({ success: false, message: err.message });
		}
	}
	async editVoucher(req, res) {
		const { id } = req.params;
		const {
			discount,
			dateStart,
			dateEnd,
			maxDiscount,
			qualifyAmount,
			qty,
		} = req.body;
		if (
			!discount ||
			!dateStart ||
			!dateEnd ||
			!maxDiscount ||
			!qualifyAmount ||
			!qty
		) {
			return res.status(400).json({
				success: false,
				message: "Cannot post without body",
			});
		}
		try {
			const editVoucher = await Voucher.findById(id);
			editVoucher.discount = discount;
			editVoucher.dateStart = dateStart;
			editVoucher.dateEnd = dateEnd;
			editVoucher.maxDiscount = maxDiscount;
			editVoucher.qualifyAmount = qualifyAmount;
			editVoucher.qty = qty;
			res.status(200).json({
				success: true,
				body: editVoucher.save(),
			});
		} catch (err) {
			res.status(400).json({ success: false, message: err.message });
		}
	}
	async deleteVoucher(req, res) {
		const { id } = req.params;

		if (!id) {
			return res.status(404).json({
				success: false,
				message: "Cannot post without ID",
			});
		}
		try {
			const deleteVoucher = await Voucher.findByIdAndDelete(id);
			res.status(200).json({ success: true, body: deleteVoucher });
		} catch (err) {
			res.status(400).json({
				success: false,
				message: err.message,
			});
		}
	}

	async listVoucher(req, res) {
		try {
			const listVoucher = await Voucher.find();
			res.status(200).json({ success: true, body: listVoucher });
		} catch (err) {
			res.status(400).json({
				success: false,
				message: err.message,
			});
		}
	}

	async detailVoucher(req, res) {
		const { id } = req.params;
		if (!id) {
			return res.status(404).json({
				success: false,
				message: "Cannot post without ID",
			});
		}
		try {
			const voucher = await Voucher.findById(id);
			res.status(200).json({ success: true, body: voucher });
		} catch (err) {
			res.status(400).json({
				success: false,
				message: err.message,
			});
		}
	}
	async checkCondition(req, res) {
		const { code, amount } = req.query;
		if (!code || !amount) {
			return res.status(404).json({
				success: false,
				message: "Cannot check condition without query params",
			});
		}
		try {
			const voucher = await Voucher.findById(voucher);
			if (!voucher.qty > 0) {
				return res
					.status(400)
					.json({
						success: false,
						message: "Số lượng voucher đã hết",
					});
			}
		} catch (err) {}
	}
	async applyVoucher(req, res) {}
}

module.exports = new VoucherController();
