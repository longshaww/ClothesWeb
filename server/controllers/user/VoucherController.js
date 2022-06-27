const Voucher = require("../../models/Vouchers");
const moment = require("moment");
const ObjectId = require("mongoose").Types.ObjectId;

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
			if (!editVoucher) {
				return res.status(404).json({
					success: false,
					message: "Mã voucher không tồn tại",
				});
			}
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
			if (!deleteVoucher) {
				res.status(404).json({
					success: false,
					message: "Mã voucher không tồn tại",
				});
			}
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
		const { user } = req.headers;
		try {
			if (code && amount) {
				if (!ObjectId.isValid(code)) {
					return res.status(400).json({
						success: false,
						message: "Mã voucher không đúng định dạng",
					});
				}
				const voucher = await Voucher.findById(code);
				if (!voucher) {
					return res.status(404).json({
						success: false,
						message: "Mã voucher không tồn tại",
					});
				}
				const existed = voucher.listUser.indexOf(user);
				if (existed == -1) {
					return res.status(400).json({
						success: false,
						message: "Bạn không sở hữu voucher này",
					});
				}
				if (!user) {
					return res.status(400).json({
						success: false,
						message: "Bạn phải đăng nhập để sử dụng voucher",
					});
				}

				if (!voucher.qty > 0) {
					return res.status(400).json({
						success: false,
						message: "Số lượng voucher đã hết",
					});
				}
				const diffDayStart = moment().diff(
					moment(voucher.dateStart),
					"days"
				);
				const diffDaysEnd = moment(voucher.dateEnd).diff(
					moment(),
					"days"
				);
				if (diffDayStart < 0) {
					return res.status(400).json({
						success: false,
						message: `Voucher khả dụng vào ngày ${moment(
							voucher.dateEnd
						).format("ll")}`,
					});
				}
				if (diffDaysEnd <= 0) {
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
			} else {
				const listVoucher = await Voucher.find();
				return res.status(200).json({
					success: true,
					body: listVoucher,
				});
			}
		} catch (err) {
			res.status(400).json({
				success: false,
				message: err.message,
			});
		}
	}
	async applyVoucher(req, res) {
		const { code, amount } = req.body;
		const { user } = req.headers;
		if (!code || !amount || !user) {
			return res.status(400).json({
				success: false,
				message: "Voucher không khả dụng",
			});
		}
		try {
			const voucher = await Voucher.findById(code);
			if (!voucher) {
				res.status(404).json({
					success: false,
					message: "Mã voucher không tồn tại",
				});
			}
			let discount = (amount * voucher.discount) / 100;
			if (discount > voucher.maxDiscount) {
				discount = voucher.maxDiscount;
			}
			await voucher.save();
			res.status(200).json({
				success: true,
				message: "Áp dụng voucher thành công",
				body: { discount, amount: amount - discount },
			});
		} catch (err) {
			res.status(400).json({ success: false, message: err.message });
		}
	}

	async userGetVoucher(req, res) {
		const { code } = req.body;
		const { user } = req.headers;
		if (!code || !user) {
			return res
				.status(400)
				.json({ success: false, message: "Lấy voucher thất bại" });
		}
		try {
			const voucher = await Voucher.findById(code);
			if (!voucher) {
				return res.status(400).json({
					success: false,
					message: "Voucher không tồn tại",
				});
			}
			const existed = voucher.listUser.indexOf(user);
			if (existed !== -1) {
				return res.status(400).json({
					success: false,
					message: "Bạn đã lấy voucher này rồi",
				});
			}
			voucher.listUser.push(user);
			res.status(200).json({
				success: true,
				body: voucher.save(),
				message: "Lấy voucher thành công",
			});
		} catch (err) {
			res.status(400).json({ success: false, message: err.message });
		}
	}

	async updateState(req, res) {
		const { id } = req.params;
		const userID = req.headers.user;
		if (!id || !userID) {
			return res.status(400).json({
				success: false,
				message: "Cập nhật trạng thái voucher thất bại",
			});
		}
		try {
			const voucher = await Voucher.findById(id);
			if (!voucher) {
				return res.status(404).json({
					success: false,
					message: "Mã voucher không tồn tại",
				});
			}
			const user = voucher.listUser.indexOf(userID);
			if (user === -1) {
				return res.status(400).json({
					success: false,
					message: "Không tìm thấy user",
				});
			}
			voucher.listUser.splice(userID, 1);
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
			if (!voucher) {
				res.status(404).json({
					success: false,
					message: "Mã voucher không tồn tại",
				});
			}
			res.status(200).json({ success: true, body: voucher });
		} catch (err) {
			res.status(400).json({
				success: false,
				message: err.message,
			});
		}
	}

	async myVoucher(req, res) {
		const { id } = req.params;
		if (!id) {
			return res.status(404).json({
				success: false,
				message: "Không thể lấy danh sách voucher",
			});
		}
		try {
			const vouchers = await Voucher.find({
				listUser: id,
			});
			if (!vouchers) {
				return res.status(400).json({
					success: false,
					message: "Bạn không có voucher nào",
				});
			}
			res.status(200).json({ success: true, body: vouchers });
		} catch (err) {
			res.status(400).json({ success: false, message: err.message });
		}
	}
}

module.exports = new VoucherController();
