const IDeliveryUser = require('../IDeliveryUser');
const DeliveryUserManager = require('../DeliveryUserManager');
class CommandAdd extends IDeliveryUser {
    constructor(infoUser) {
        super();
        this._infoUser = infoUser;
    }

    execute() {
        const deliveryUserManager = new DeliveryUserManager();
        return deliveryUserManager.create(this._infoUser);
    }
}
module.exports = CommandAdd;
