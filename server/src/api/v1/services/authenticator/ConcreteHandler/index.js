const CheckBillBelongUser = require('./CheckBillBelongUser');
const CheckOldPassword = require('./CheckOldPassword');
const CheckStatusValidator = require('./CheckStatusValidator');
const CheckVerifyNewPassword = require('./CheckVerifyNewPassword');
const EmailValidator = require('./EmailValidator');
const IsEmptyValidator = require('./IsEmptyValidator');
const IsEmptyValidatorToken = require('./IsEmptyValidatorToken');
const PasswordValidator = require('./PasswordValidator');

module.exports = {
    CheckBillBelongUser,
    CheckOldPassword,
    CheckStatusBill : CheckStatusValidator,
    CheckVerifyNewPassword,
    EmailValidator,
    IsEmptyValidator,
    IsEmptyValidatorToken,
    PasswordValidator,
};
