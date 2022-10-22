const ValidatorService = require('../../authenticator/index');
const User = require('../../../models/UserWeb');
const md5 = require('md5');
class UserService {
    constructor(id) {
        this._id = id;
    }
    async changePassword(model) {
        model.currentStep = 'VALIDATE_CHANGE_PASSWORD';
        try {
            const validatorService = new ValidatorService();
            const flag = await validatorService.performValidation(model);
            if (!flag) {
                throw new Error('ERROR REQUEST DATA');
            }
            const newPassword = await this.getNewPasswordUser(model);
            return User.updateOne(
                { _id: this._id },
                {
                    $set: {
                        password: newPassword,
                    },
                }
            ).then((data) => {
                return data ?? new Error('NOT DATA ERROR');
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }
    getNewPasswordUser = (model) => md5(model.password);
}
module.exports = UserService;
