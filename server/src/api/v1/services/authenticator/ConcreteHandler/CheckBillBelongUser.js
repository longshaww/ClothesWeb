const {Bill} = require('../../../models/index');
const AbtractValidator = require('../AbtractValidator');
const jwt = require('jsonwebtoken');

class CheckBillBelongUser extends AbtractValidator {
    async isValid(model) {
        try {
            const token = await this.getAccessToken(model);
            return await jwt.verify(token, 'mySecretKey', async (err, dataUser) => {
                if (err) {
                    return false;
                } else {
                    const idBill = await this.getIdBillWeb(model);
                    const bill = await Bill.findById(idBill);
                    const userID = JSON.stringify(bill.userID).replace(/\"/g, '');
                    if (userID == dataUser.id) {
                        return super.isValid(model);
                    }
                    return false;
                }
            });
        } catch (err) {
            throw Error(err.message);
        }
    }
    getIdBillWeb(model) {
        return model.idBill;
    }
    async getAccessToken(model) {
        const author = model.headers.authorization;
        return await author.split(' ')[1];
    }
}
module.exports = CheckBillBelongUser;
