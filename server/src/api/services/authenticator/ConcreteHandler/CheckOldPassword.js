const AbtractValidator = require('../AbtractValidator');
const User = require('../../../models/UserWeb');
const md5 = require('md5');
class CheckOldPassword extends AbtractValidator {
    async isValid(model) {
        try {
            console.log('vai CheckOldPassword');

            const idUser = await this.getIdUser(model);
            const oldPassword = await this.getPasswordUser(model);
            const newPassword = await this.getNewPasswordUser(model);
            const user = await User.findById(idUser);
            if (user.password === oldPassword && user.password !== newPassword) {
                return super.isValid(model);
            }
            return false;
        } catch (err) {
            throw Error(err.message);
        }
    }
    getIdUser(model) {
        return model.id;
    }
    getPasswordUser(model) {
        return md5(model.oldPassword);
    }
    getNewPasswordUser(model) {
        return md5(model.password);
    }
}
module.exports = CheckOldPassword;
