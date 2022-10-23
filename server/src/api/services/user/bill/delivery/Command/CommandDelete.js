const IDeliveryUser = require('../IDeliveryUser');
const DeliveryUserManager = require('../DeliveryUserManager');
class CommandDelete extends IDeliveryUser {
    constructor(id) {
        super();
        this._id = id;
    }

    execute() {
        console.log('vao');
        const deliveryUserManager = new DeliveryUserManager();
        return deliveryUserManager.delete(this._id);
    }
}
module.exports = CommandDelete;
