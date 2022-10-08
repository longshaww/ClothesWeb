const BillWeb = require('../../../../models/BillWeb');
const DeliveryInfo = require('../../../../models/DeliveryInfo');
const Session = require('../../../../models/Sessions');
class BillUserService {
    constructor(
        userID,
        nameCustomer,
        address,
        phoneNumber,
        email,
        listProduct,
        paymentMethod,
        idDelivery,
        voucherID,
        total
    ) {
        this._userID = userID;
        this._nameCustomer = nameCustomer;
        this._address = address;
        this._phoneNumber = phoneNumber;
        this._email = email;
        this._listProduct = listProduct;
        this._paymentMethod = paymentMethod;
        this._idDelivery = idDelivery;
        this._voucherID = voucherID;
        this._total = total;
    }

    async createBill(sessionId) {
        try {
            const newBillWeb = new BillWeb({
                listProduct: this._listProduct,
                paymentMethod: this._paymentMethod,
                total: this._total,
                subTotal: this._listProduct.reduce((a, b) => a + b.sum, 0),
                qtyProduct: this._listProduct.reduce((a, b) => a + b.qty, 0),
                status: this._paymentMethod === 'COD' ? false : true,
                shippingFee: 35,
            });
            if (this._voucherID) {
                newBillWeb.voucherID = this._voucherID;
            }
            if (this._userID) {
                newBillWeb.userID = this._userID;
                if (this._idDelivery) {
                    newBillWeb.deliveryID = this._idDelivery;
                }
            } else {
                const newInfo = await DeliveryInfo.create({
                    nameCustomer: this._nameCustomer,
                    address: this._address,
                    phoneNumber: this._phoneNumber,
                    email: this._email,
                });
                newBillWeb.deliveryID = newInfo.id;
            }
            const currentSession = await Session.findById(sessionId);
            if (currentSession) {
                currentSession.cart = [];
                currentSession.save();
            }
            await newBillWeb.save();
            const idBillWeb = newBillWeb._id;
            let bill = await this.getBill(idBillWeb);
            return bill ?? null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getBill(idBillWeb) {
        try {
            const billResult = await BillWeb.findById(idBillWeb)
                .populate('userID')
                .populate('deliveryID')
                .populate('listProduct._id')
                .populate('voucherID');
            return await billResult;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
module.exports = BillUserService;
