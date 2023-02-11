const DeliveryInfo = require('../../../../models/DeliveryInfo');
const {User} = require('../../../../models/index');
class DeliveryUserManager {
    constructor() {}

    async create(infoUser) {
        try {
            return DeliveryInfo.create(infoUser).then((data) => {
                return data;
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async edit(nameCustomer, address, phoneNumber, id) {
        try {
            const deliveryInfo = await DeliveryInfo.findById(id);
            deliveryInfo.nameCustomer = nameCustomer;
            deliveryInfo.address = address;
            deliveryInfo.phoneNumber = phoneNumber;
            return await deliveryInfo.save().then((data) => {
                return data ;
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async delete(id) {
        try {
            return DeliveryInfo.findByIdAndDelete(id).then((data) => {
                return data;
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getListInfo(userID) {
        try {
            const user = await User.findById(userID);
            const customize = {
                _id: user._id,
                nameCustomer: user.information.name,
                address: user.information.address,
                phoneNumber: user.information.phoneNumber,
            };
            const listInfo = await DeliveryInfo.find({ userID: userID });
            await listInfo.unshift(customize);
            return listInfo;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
module.exports = DeliveryUserManager;
