const BillWeb = require('../../../../models/BillWeb');
const DeliveryInfo = require('../../../../models/DeliveryInfo');
const Session = require('../../../../models/Sessions');
const Product = require('../../../../models/Product');
const User = require('../../../../models/UserWeb');
const CancelBills = require('../../../../models/CancelBill');
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
            await newBillWeb.save();
            if (
                newBillWeb.userID !== undefined ||
                newBillWeb.userID !== null ||
                newBillWeb.userID.length !== 0
            ) {
                const flag2 = await this.postReward(newBillWeb.userID, newBillWeb.total);
                if (!flag2) return null;
            }
            const idBillWeb = newBillWeb._id;
            let bill = await this.getBill(idBillWeb);
            return bill ?? null;
        } catch (err) {
            throw new Error(err.message);
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
                console.log(flag);
                if (!flag) return false;
            }
            return await true;
        } catch (err) {
            throw new Error(err.message);
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
            throw new Error(err.message);
        }
    }
    async postReward(idUser, totalMoney) {
        try {
            const reward = await this.returnReward(totalMoney);
            if (reward > 0) {
                const user = await User.findById(idUser);
                const myPointNow = user.myPoint;
                user.myPoint = myPointNow + reward;
                return await user.save().then((data) => {
                    return data ? true : false;
                });
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async returnReward(totalMoney) {
        let point = totalMoney;
        switch (true) {
            case point >= 500:
                return 10;
            case point >= 1000 && point < 2000:
                return 20;
            case point >= 2000:
                return 50;
            default:
                return 0;
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
            throw new Error(err.message);
        }
    }

    async cancelBill(idBill, reason) {
        try {
            const bill = await BillWeb.findById(idBill);
            if (bill.status === 'PENDING') {
                bill.status = 'CANCEL_BILL';
                return await bill.save().then(async (dataBill) => {
                    return await this.createBillCancel(bill._id, bill.paymentMethod, reason).then(
                        async () => {
                            return await this.addQtyProduct(bill.listProduct).then(async () => {
                                return dataBill;
                            });
                        }
                    );
                });
            }
            return null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async createBillCancel(idBill, paymentMethod, reason) {
        try {
            const cancelBill = new CancelBills({
                billID: idBill,
                reason: reason,
                moneyStatus: paymentMethod === 'COD' ? 'NO_REFUNDS' : 'NEED_REFUNDS',
            });
            await cancelBill.save();
            return cancelBill ?? null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async addQtyProduct(listProductBill) {
        return listProductBill.forEach(async (el) => {
            await this.executeAddProduct(el.idProduct, el.qty, el.size);
        });
    }

    async executeAddProduct(idProduct, qty, size) {
        try {
            const productInfo = await Product.findById(idProduct);
            const sizeVariables = productInfo.size;
            let flagCatchError = true;
            const buyedResult = productInfo.buyed - qty;
            await sizeVariables.forEach(async (el) => {
                const sizeName = el.sizeName;
                const qtyProduct = el.qty;
                if (size === sizeName) {
                    const resultQty = qtyProduct + qty;
                    if (resultQty < 0) {
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
            return Error(err.message);
        }
    }
}
module.exports = BillUserService;
