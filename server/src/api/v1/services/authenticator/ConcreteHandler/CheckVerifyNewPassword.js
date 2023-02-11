const AbtractValidator = require('../AbtractValidator');
const md5 = require('md5');
class CheckVerifyNewPassword extends AbtractValidator {
    async isValid(model) {
        try {
            const verifyNewPassword = await this.getVerifyNewPassword(model);
            const newPassword = await this.getNewPasswordUser(model);
            if (verifyNewPassword === newPassword) {
                return super.isValid(model);
            }
            return false;
        } catch (err) {
            throw Error(err.message);
        }
    }
    //202cb962ac59075b964b07152d234b70
    getVerifyNewPassword(model) {
        return md5(model.verifyNewPassword);
    }
    getNewPasswordUser(model) {
        return md5(model.password);
    }
}
module.exports = CheckVerifyNewPassword;
