const Bill = require('../../../../models/BillWeb');
const IStrategy = require('../IStrategy');
const UpdateCancel = require('../ConcreteStrategy/UpdateCancel');
class UpdateFailedConfirm extends IStrategy {
    constructor(idBill) {
        super();
        this._idBill = idBill;
    }

    async update() {
        try {
            const bill = await Bill.findById(this._idBill);
            if (bill.status === 'DELIVERY') {
                bill.status = 'FAILED_DELIVERY_CONFIRMATION';
                return await bill.save().then(async (dataBill) => {
                    const reasons = 'Bill được hủy do không giao được hàng ';
                    const updateCancel = new UpdateCancel(this._idBill, reasons);
                    await updateCancel.createBillCancel(this._idBill, dataBill.paymentMethod);
                    return dataBill;
                });
            }
            throw new Error('Bill status not delivery ');
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
module.exports = UpdateFailedConfirm;
