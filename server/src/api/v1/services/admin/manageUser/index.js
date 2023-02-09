const {User} = require('../../../models/index');
var ObjectId = require('mongodb').ObjectId;
const md5 = require('md5');
const ValidatorService = require('../../authenticator/index');
class ManageUserService {
    constructor(id) {
        this._idUser = id;
    }

    async editUser(model) {
        try {
            const user = await User.findOneWithDeleted({ _id: this._idUser });
            user.information = model.information;
            user.role = model.role;
            user.myPoint = model.myPoint;
            user.vip = model.vip;
            user.moneyPayed = model.moneyPayed;
            return await user.save().then((data) => {
                return data ?? null;
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getIdUser() {
        try {
            const data = await User.findOneWithDeleted({ _id: ObjectId(this._idUser) });
            return data ?? null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async changePassword(password) {
        try {
            const model = {
                password,
                currentStep: 'VALIDATE_NEW_PASSWORD_ADMIN',
            };
            const validatorService = new ValidatorService();
            const flag = await validatorService.performValidation(model);
            if (!flag) {
                throw new Error('ERROR REQUEST DATA');
            }
            await User.updateOneWithDeleted(
                { _id: ObjectId(this._idUser) },
                {
                    $set: {
                        password: md5(model.password),
                    },
                }
            );
            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
module.exports = ManageUserService;
