const {Bill} = require('../../../models/index');
const AbtractValidator = require('../AbtractValidator');
class CheckStatusBill extends AbtractValidator {
    async isValid(model) {
        try {
            const idBill = await this.getIdBillWeb(model);
            if (idBill === undefined || idBill === null) return false;
            const bill = await Bill.findById(idBill);
            console.log(bill);
            if (bill.status == 'PENDING') return super.isValid(model);
            return false;
        } catch (err) {
            throw Error(err.message);
        }
    }
    getIdBillWeb(model) {
        return model.idBill;
    }
}
module.exports = CheckStatusBill;
