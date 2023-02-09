const BillWeb = require('./BillWeb');
const CancelBill = require('./CancelBill');
const Collections = require('./Collections');
const Customers = require('./Customers');
const DeliveryInfo = require('./DeliveryInfo');
const Discount = require('./Discount');
const Product = require('./Product');
const Rate = require('./Rate');
const Sessions = require('./Sessions');
const Types = require('./Types');
const UserOTPVerification = require('./UserOTPVerification');
const UserOTPVerificationForgetPassword = require('./UserOTPVerificationForgetPassword');
const UserWeb = require('./UserWeb');
const Vouchers = require('./Vouchers');

module.exports = {
    Bill: BillWeb,
    CancelBill,
    Collections,
    Customers,
    DeliveryInfo,
    Discount,
    Product,
    Rate,
    Sessions,
    Types,
    UserOTPVerification,
    UserOTPVerificationForgetPassword,
    User: UserWeb,
    Voucher: Vouchers,
};
