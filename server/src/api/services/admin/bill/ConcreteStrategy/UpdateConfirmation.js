const Bill = require('../../../../models/BillWeb');
const IStrategy = require('../IStrategy');

class UpdateConfirmation extends IStrategy {
    constructor(idBill) {
        super();
        this._idBill = idBill;
    }

    async update() {
        try {
            const bill = await Bill.findById(this._idBill);
            if (bill.status === 'DELIVERY') {
                bill.status = 'SUCCESSFUL_DELIVERY_CONFIRMATION';
                await bill.save();
                return bill ? bill : null;
            }
            throw new Error('Bill status not DELIVERY');
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
module.exports = UpdateConfirmation;
