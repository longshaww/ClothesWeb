const {Bill} = require('../../../../models/index');
const IStrategy = require('../IStrategy');
class UpdatePending extends IStrategy {
    constructor(idBill) {
        super();
        this._idBill = idBill;
    }

    async update() {
        try {
            const bill = await Bill.findById(this._idBill);
            if (bill.status === 'PENDING') {
                bill.status = 'DELIVERY';
                await bill.save();
                return bill ? bill : null;
            }
            throw new Error('STATUS BILL NOT PENDING');
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
module.exports = UpdatePending;
