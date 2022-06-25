const Voucher = require("../../models/Vouchers");
const moment = require("moment");
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
		const { code, amount } = req.query;
		try {
			if (code && amount) {
				const voucher = await Voucher.findById(code);
				if (!voucher.qty > 0) {
					return res.status(400).json({
						success: false,
						message: "Số lượng voucher đã hết",
					});
				}
				const diffDays = moment(voucher.dateEnd).diff(
					moment(),
					"days"
				);
				if (diffDays <= 0) {
					return res.status(400).json({
						success: false,
						message: "Voucher đã hết hạn",
					});
				}
				if (amount < voucher.qualifyAmount) {
					return res.status(400).json({
						success: false,
						message: "Voucher không đủ điều kiện",
					});
				}
				let discount = (amount * voucher.discount) / 100;
				if (discount > voucher.maxDiscount) {
					discount = voucher.maxDiscount;
				}
				return res.status(200).json({
					success: true,
					message: "Voucher khả dụng",
				});
			}

			const listVoucher = await Voucher.find();
			return res.status(200).json({
				success: true,
				body: listVoucher,
			});
		} catch (err) {
			res.status(400).json({
				success: false,
				message: err.message,
			});
		}
	}
	async applyVoucher(req, res) {
		const { code, amount } = req.body;
		if (!code || !amount) {
			return res.status(400).json({
				success: false,
				message: "Cannot post without body",
			});
		}
		try {
			const voucher = await Voucher.findById(code);
			let discount = (amount * voucher.discount) / 100;
			if (discount > voucher.maxDiscount) {
				discount = voucher.maxDiscount;
			}
			await voucher.save();
			return res.status(200).json({
				success: true,
				message: "Áp dụng voucher thành công",
				body: { discount, amount: amount - discount },
			});
		} catch (err) {
			res.status(400).json({ success: false, message: err.message });
		}
	}

	async updateQtyVoucher(req, res) {
		const { code, amount } = req.body;
		if (!code || !amount) {
			return res.status(400).json({
				success: false,
				message: "Cannot post without body",
			});
		}
		try {
			const voucher = await Voucher.findById(code);
			voucher.qty = voucher.qty - 1;
			res.status(200).json({ success: true, body: voucher.save() });
		} catch (err) {
			res.status(400).json({ success: false, message: err.message });
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
}

module.exports = new VoucherController();
