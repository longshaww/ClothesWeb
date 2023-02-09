const DeliveryInfo = require('../../../../models/DeliveryInfo');
const UserWeb = require('../../../../models/UserWeb');
class DeliveryUserManager {
    constructor() {}

    async create(infoUser) {
        try {
            return DeliveryInfo.create(infoUser).then((data) => {
                return data ?? null;
            });
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async edit(nameCustomer, address, phoneNumber, id) {
        try {
            const deliveryInfo = await DeliveryInfo.findById(id);
            deliveryInfo.nameCustomer = nameCustomer;
            deliveryInfo.address = address;
            deliveryInfo.phoneNumber = phoneNumber;
            return await deliveryInfo.save().then((data) => {
                return data ?? null;
            });
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async delete(id) {
        try {
            return DeliveryInfo.findByIdAndDelete(id).then((data) => {
                return data ?? null;
            });
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getListInfo(userID) {
        try {
            const user = await UserWeb.findById(userID);
            const customize = {
                _id: user._id,
                nameCustomer: user.information.name,
                address: user.information.address,
                phoneNumber: user.information.phoneNumber,
            };
            const listInfo = await DeliveryInfo.find({ userID: userID });
            await listInfo.unshift(customize);
            return listInfo ?? null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
module.exports = DeliveryUserManager;
