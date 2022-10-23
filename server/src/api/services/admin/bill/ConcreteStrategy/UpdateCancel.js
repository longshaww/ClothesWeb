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
            if (bill.status === 'PENDING') {
                bill.status = 'CANCEL_BILL';
              return  await bill.save().then(async (dataBill) => {
                    const data = await this.createBillCancel(bill._id);
                    return data ? dataBill : null;
                });
            }
            return null;
        } catch (err) {
            return null;
        }
    }

    async createBillCancel(idBill, paymentMethod) {
        try {
            const cancelBill = new CancelBills({
                billID: idBill,
                reason: this._reason,
                moneyStatus: paymentMethod === 'COD' ? 'NO_REFUNDS' : 'NEED_REFUNDS',
            });
            await cancelBill.save();
            return cancelBill ?? null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
module.exports = UpdateCancel;
