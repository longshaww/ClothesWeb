const IDeliveryUser = require('../IDeliveryUser');
const DeliveryUserManager = require('../DeliveryUserManager');
class CommandView extends IDeliveryUser {
    constructor(userID) {
        super();
        this._userId = userID;
    }

    execute() {
        const deliveryUserManager = new DeliveryUserManager();
        return deliveryUserManager.getListInfo(this._userId);
    }
}
module.exports = CommandView;
