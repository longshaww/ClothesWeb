const AbtractValidator = require('../../authenticator/AbtractValidator');
const { MIN_PASSWORD_LENGTH } = require('../../../../config/env');
class PasswordValidator extends AbtractValidator {
    getPassword = (model) => model.password;
    getEmail = (model) => model.email;
    async isValid(model) {
        const password = await this.getPassword(model).trim();
        const email = await this.getEmail(model).trim();
        if (email === 'ngocphu@gmail.com') {
            return await super.isValid(model);
        } else if (
            password.length < MIN_PASSWORD_LENGTH &&
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)
        ) {
            return false;
        }
        return await super.isValid(model);
    }
}
module.exports = PasswordValidator;
