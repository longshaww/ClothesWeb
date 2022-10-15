const BillWeb = require('../../../../models/BillWeb');
const DeliveryInfo = require('../../../../models/DeliveryInfo');
const Session = require('../../../../models/Sessions');
const Product = require('../../../../models/Product');
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
            const flag1 = await this.minusProduct();
            const flag2 = await this.postReward();
            if (!flag1) {
                return null;
            }
            const newBillWeb = new BillWeb({
                listProduct: this._listProduct,
                paymentMethod: this._paymentMethod,
                total: this._total,
                subTotal: this._listProduct.reduce((a, b) => a + b.sum, 0),
                qtyProduct: this._listProduct.reduce((a, b) => a + b.qty, 0),
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
                await Session.updateOne(
                    { _id: sessionId },
                    {
                        $set: {
                            cart: [],
                        },
                    }
                );
            }
            console.log('vao');
            await newBillWeb.save();
            const idBillWeb = newBillWeb._id;
            let bill = await this.getBill(idBillWeb);
            return bill ?? null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async minusProduct() {
        try {
            const listProduct = this._listProduct;
            for (let el of listProduct) {
                const idProduct = el.idProduct;
                const qtyProductUserBuy = el.qty;
                const sizeNameUserBuy = el.size;
                const flag = await this.executeMinus(idProduct, qtyProductUserBuy, sizeNameUserBuy);
                if (!flag) return false;
            }
            return await true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    // private
    async executeMinus(idProduct, qtyProductUserBuy, sizeNameUserBuy) {
        try {
            const productInfo = await Product.findById(idProduct);
            const sizeVariables = productInfo.size;
            let flagCatchError = true;
            const buyedResult = productInfo.buyed + qtyProductUserBuy;
            await sizeVariables.forEach(async (el) => {
                const sizeName = el.sizeName;
                const qtyProduct = el.qty;
                if (sizeNameUserBuy === sizeName) {
                    const resultQty = qtyProduct - qtyProductUserBuy;
                    if (resultQty >= 0) {
                        el.qty = resultQty;
                        return;
                    }
                    flagCatchError = false;
                    return;
                }
            });
            if (!flagCatchError) return false;

            const product = await Product.updateOne(
                { _id: idProduct },
                {
                    $set: {
                        size: sizeVariables,
                        buyed: buyedResult,
                    },
                }
            );
            return product ? true : false;
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
