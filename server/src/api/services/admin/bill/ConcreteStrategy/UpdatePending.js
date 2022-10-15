const Bill = require('../../../../models/BillWeb');
const IStrategy = require('../IStrategy');
class UpdatePending extends IStrategy{
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
            return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
module.exports = UpdatePending;
