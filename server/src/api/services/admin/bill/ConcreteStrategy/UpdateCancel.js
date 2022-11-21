const Bill = require('../../../../models/BillWeb');
const CancelBills = require('../../../../models/CancelBill');
const IStrategy = require('../IStrategy');
class UpdateCancel extends IStrategy {
    constructor(idBill, reason) {
        super();
        this._idBill = idBill;
        this._reason = reason;
    }

    async update() {
        try {
            const bill = await Bill.findById(this._idBill);
            if (bill.status === 'PENDING' || bill.status === 'DELIVERY') {
                bill.status = 'CANCEL_BILL';
                return await bill.save().then(async (dataBill) => {
                    await this.createBillCancel(this._idBill, dataBill.paymentMethod);
                    return dataBill;
                });
            }
            throw new Error('BILL STATUS NOT PENDING');
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async createBillCancel(idBill, paymentMethod) {
        try {
            const cancelBill = new CancelBills({
                billID: idBill,
                reason: this._reason,
                moneyStatus: paymentMethod === 'COD' ? 'NO_REFUNDS' : 'NEED_REFUNDS',
            });
            return cancelBill.save();
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
module.exports = UpdateCancel;
