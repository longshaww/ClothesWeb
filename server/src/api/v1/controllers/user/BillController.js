const DeliveryUserService = require('../../services/user/bill/delivery/index');
const BillService = require('../../services/user/bill/serviceBill/index');
const {
    CommandAdd,
    CommandEdit,
    CommandDelete,
    CommandView,
} = require('../../services/user/bill/delivery/Command/index');
const Logger = require('../../../../config/logger');
class BillController {
    async addNewInfoUser(req, res) {
        const { userID, nameCustomer, address, phoneNumber } = req.body;
        if (!userID || !nameCustomer || !address || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: 'Cannot post without body !',
            });
        }
        try {
            let create = new CommandAdd(req.body);
            let deliveryMangerService = new DeliveryUserService(create);
            const newDeliveryInfo = await deliveryMangerService.run();
            res.status(200).json({ success: true, body: newDeliveryInfo });
        } catch (err) {
            res.status(500).json({ success: false, message: err });
        }
    }
    async editInfoUser(req, res) {
        const { id } = req.params;
        const { nameCustomer, address, phoneNumber } = req.body;
        if ((!id, !nameCustomer || !address || !phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Cannot post without body !',
            });
        }
        try {
            const infoUser = {
                nameCustomer,
                address,
                phoneNumber,
                id,
            };
            let edit = new CommandEdit(infoUser);
            let deliveryMangerService = new DeliveryUserService(edit);
            const data = await deliveryMangerService.run(req.body);
            res.status(200).json({
                success: true,
                body: data,
            });
        } catch (err) {
            res.status(500).json({ success: false, message: err });
        }
    }
    async deleteInfoUser(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Cannot post without body !',
            });
        }
        try {
            let actionDelete = new CommandDelete(id);
            let deliveryMangerService = new DeliveryUserService(actionDelete);
            const data = await deliveryMangerService.run();
            res.status(200).json({ success: true, body: data });
        } catch (err) {
            res.status(500).json({ success: false, message: err });
        }
    }

    async listInfo(req, res) {
        const { userID } = req.body;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: 'Cannot post without body !',
            });
        }
        try {
            let view = new CommandView(userID);
            let deliveryMangerService = new DeliveryUserService(view);
            let listInfo = await deliveryMangerService.run();
            res.status(200).json({ success: true, body: listInfo });
        } catch (err) {
            Logger.getInstance().logger.error(`ERROR MESSAGE OF listInfo: ${err}`);
            res.status(500).json({ success: false, message: err });
        }
    }

    async getBill(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: 'Cannot post without id',
            });
        }
        try {
            const billService = new BillService();
            const bill = await billService.getBill(id);
            res.status(200).json({
                success: true,
                body: bill,
            });
        } catch (err) {
            res.status(500).json({ success: false, message: err });
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
                message: 'Cannot post without body !',
            });
        }
        try {
            const billService = new BillService(
                userID,
                nameCustomer,
                address,
                phoneNumber,
                email,
                listProduct,
                paymentMethod,
                idDelivery,
                voucherID,
                total
            );

            const billResult = await billService.createBill(sessionId);
            billResult
                ? res.status(200).json({
                      success: true,
                      body: billResult,
                  })
                : res.status(401).json({
                      success: false,
                      msg: 'failed create bill',
                  });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async updateCancelBill(req, res, next) {
        try {
            const idBill = req.params.idBill;
            const reason = req.body.reason ?? null;

            if (idBill == '' || idBill === null || idBill === undefined) {
                res.status(404).json({
                    success: false,
                    message: 'ERROR DATA REQUEST',
                });
            }
            const billService = new BillService();
            const dataBill = await billService.cancelBill(idBill, reason);
            dataBill
                ? res.status(200).json({ success: true, data: dataBill })
                : res.status(404).json({ success: false, msg: 'FAILED UPDATE CANCEL BILL' });
        } catch (err) {
            res.status(500).json({
                success: false,
                msg: err.message,
            });
        }
    }
}

module.exports = new BillController();
