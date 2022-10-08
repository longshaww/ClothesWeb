const moment = require('moment');
const ObjectId = require('mongoose').Types.ObjectId;
const {
    CreateVoucher,
    ApplyVoucher,
    DeleteVoucher,
    DetailVoucher,
    EditVoucher,
    ListVoucher,
    MyVoucher,
    UpdateState,
    UserGetVoucher,
} = require('../../command/voucher');
const Command = require('../../command');
const command = new Command();
class VoucherController {
    async createVoucher(req, res) {
        try {
            const newVoucher = command.execute(new CreateVoucher(req, res));
            return newVoucher;
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    async editVoucher(req, res) {
        try {
            const editVoucher = command.execute(new EditVoucher(req, res));
            return editVoucher;
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
    async deleteVoucher(req, res) {
        try {
            const deleteVoucher = command.execute(new DeleteVoucher(req, res));
            return deleteVoucher;
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    async listVoucher(req, res) {
        try {
            const listVoucher = command.execute(new ListVoucher(req, res));
            return listVoucher;
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }
    async applyVoucher(req, res) {
        try {
            const applyVoucher = command.execute(new ApplyVoucher(req, res));
            return applyVoucher;
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    async userGetVoucher(req, res) {
        try {
            const userGetVoucher = command.execute(new UserGetVoucher(req, res));
            return userGetVoucher;
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    async updateState(req, res) {
        try {
            const updateState = command.execute(new UpdateState(req, res));
            return updateState;
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    async detailVoucher(req, res) {
        try {
            const detailVoucher = command.execute(new DetailVoucher(req, res));
            return detailVoucher;
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }

    async myVoucher(req, res) {
        try {
            const myVoucher = command.execute(new MyVoucher(req, res));
            return myVoucher;
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }
}

module.exports = new VoucherController();
