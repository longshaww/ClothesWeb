const IDeliveryUser = require('../IDeliveryUser');
const DeliveryUserManager = require('../DeliveryUserManager');
class CommandEdit extends IDeliveryUser {
    constructor(infoUser) {
        super();
        this._nameCustomer = infoUser.nameCustomer;
        this._address = infoUser.address;
        this._phoneNumber = infoUser.phoneNumber;
        this._idUser = infoUser.id;
    }
    execute() {
        const deliveryUserManager = new DeliveryUserManager();
        return deliveryUserManager.edit(
            this._nameCustomer,
            this._address,
            this._phoneNumber,
            this._idUser
        );
    }
}
module.exports = CommandEdit;
