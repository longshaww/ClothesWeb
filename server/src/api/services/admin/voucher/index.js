const Voucher = require('../../../models/Vouchers');

module.exports = {
    createVoucher: async function (req, res) {
        const { discount, dateStart, dateEnd, maxDiscount, qualifyAmount, qty } = req.body;
        if (!discount || !dateStart || !dateEnd || !maxDiscount || !qualifyAmount || !qty) {
            return res.status(400).json({
                success: false,
                message: 'Cannot post without body',
            });
        }
        const newVoucher = await Voucher.create(req.body);
        return res.status(201).json({ success: true, body: newVoucher });
    },
    editVoucher: async function (req, res) {
        const { id } = req.params;
        const { discount, dateStart, dateEnd, maxDiscount, qualifyAmount, qty } = req.body;
        if (!discount || !dateStart || !dateEnd || !maxDiscount || !qualifyAmount || !qty) {
            return res.status(400).json({
                success: false,
                message: 'Cannot post without body',
            });
        }
        const editVoucher = await Voucher.findById(id);
        if (!editVoucher) {
            return res.status(404).json({
                success: false,
                message: 'Mã voucher không tồn tại',
            });
        }
        editVoucher.discount = discount;
        editVoucher.dateStart = dateStart;
        editVoucher.dateEnd = dateEnd;
        editVoucher.maxDiscount = maxDiscount;
        editVoucher.qualifyAmount = qualifyAmount;
        editVoucher.qty = qty;
        return res.status(200).json({
            success: true,
            body: editVoucher.save(),
        });
    },
    deleteVoucher: async function (req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({
                success: false,
                message: 'Cannot post without ID',
            });
        }
        const deleteVoucher = await Voucher.findByIdAndDelete(id);
        if (!deleteVoucher) {
            res.status(404).json({
                success: false,
                message: 'Mã voucher không tồn tại',
            });
        }
        return res.status(200).json({ success: true, message: 'Deleted' });
    },
    listVoucher: async function (req, res) {
        const { code, amount } = req.query;
        const { user } = req.headers;
        if (code && amount) {
            if (!ObjectId.isValid(code)) {
                return res.status(400).json({
                    success: false,
                    message: 'Mã voucher không đúng định dạng',
                });
            }
            const voucher = await Voucher.findById(code);
            if (!voucher) {
                return res.status(404).json({
                    success: false,
                    message: 'Mã voucher không tồn tại',
                });
            }
            const existed = voucher.listUser.indexOf(user);
            if (existed == -1) {
                return res.status(400).json({
                    success: false,
                    message: 'Bạn không sở hữu voucher này',
                });
            }
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Bạn phải đăng nhập để sử dụng voucher',
                });
            }

            if (!voucher.qty > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Số lượng voucher đã hết',
                });
            }
            const diffDayStart = moment().diff(moment(voucher.dateStart), 'days');
            const diffDaysEnd = moment(voucher.dateEnd).diff(moment(), 'days');
            if (diffDayStart < 0) {
                return res.status(400).json({
                    success: false,
                    message: `Voucher khả dụng vào ngày ${moment(voucher.dateEnd).format('ll')}`,
                });
            }
            if (diffDaysEnd <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Voucher đã hết hạn',
                });
            }
            if (amount < voucher.qualifyAmount) {
                return res.status(400).json({
                    success: false,
                    message: 'Voucher không đủ điều kiện',
                });
            }
            let discount = (amount * voucher.discount) / 100;
            if (discount > voucher.maxDiscount) {
                discount = voucher.maxDiscount;
            }
            return res.status(200).json({
                success: true,
                message: 'Voucher khả dụng',
            });
        } else {
            const listVoucher = await Voucher.find();
            return res.status(200).json({
                success: true,
                body: listVoucher,
            });
        }
    },
    applyVoucher: async function (req, res) {
        const { code, amount } = req.body;
        const { user } = req.headers;
        if (!code || !amount || !user) {
            return res.status(400).json({
                success: false,
                message: 'Voucher không khả dụng',
            });
        }
        const voucher = await Voucher.findById(code);
        if (!voucher) {
            res.status(404).json({
                success: false,
                message: 'Mã voucher không tồn tại',
            });
        }
        let discount = (amount * voucher.discount) / 100;
        if (discount > voucher.maxDiscount) {
            discount = voucher.maxDiscount;
        }
        await voucher.save();
        return res.status(200).json({
            success: true,
            message: 'Áp dụng voucher thành công',
            body: { discount, amount: amount - discount },
        });
    },
    userGetVoucher: async function (req, res) {
        const { code } = req.body;
        const { user } = req.headers;
        if (!code || !user) {
            return res.status(400).json({ success: false, message: 'Lấy voucher thất bại' });
        }
        const voucher = await Voucher.findById(code);
        if (!voucher) {
            return res.status(400).json({
                success: false,
                message: 'Voucher không tồn tại',
            });
        }
        const existed = voucher.listUser.indexOf(user);
        if (existed !== -1) {
            return res.status(400).json({
                success: false,
                message: 'Bạn đã lấy voucher này rồi',
            });
        }
        voucher.listUser.push(user);
        return res.status(200).json({
            success: true,
            body: voucher.save(),
            message: 'Lấy voucher thành công',
        });
    },
    updateState: async function (req, res) {
        const { id } = req.params;
        const userID = req.headers.user;
        if (!id || !userID) {
            return res.status(400).json({
                success: false,
                message: 'Cập nhật trạng thái voucher thất bại',
            });
        }
        const voucher = await Voucher.findById(id);
        if (!voucher) {
            return res.status(404).json({
                success: false,
                message: 'Mã voucher không tồn tại',
            });
        }
        const user = voucher.listUser.indexOf(userID);
        if (user === -1) {
            return res.status(400).json({
                success: false,
                message: 'Không tìm thấy user',
            });
        }
        voucher.listUser.splice(userID, 1);
        voucher.qty = voucher.qty - 1;
        return res.status(200).json({ success: true, body: voucher.save() });
    },
    detailVoucher: async function (req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: 'Cannot post without ID',
            });
        }
        const voucher = await Voucher.findById(id);
        if (!voucher) {
            res.status(404).json({
                success: false,
                message: 'Mã voucher không tồn tại',
            });
        }
        return res.status(200).json({ success: true, body: voucher });
    },
    myVoucher: async function (req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: 'Không thể lấy danh sách voucher',
            });
        }
        const vouchers = await Voucher.find({
            listUser: id,
        });
        if (!vouchers) {
            return res.status(400).json({
                success: false,
                message: 'Bạn không có voucher nào',
            });
        }
        return res.status(200).json({ success: true, body: vouchers });
    },
};
