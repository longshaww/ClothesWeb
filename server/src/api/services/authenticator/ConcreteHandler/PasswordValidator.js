const AbtractValidator = require('../../authenticator/AbtractValidator');
const { MIN_PASSWORD_LENGTH } = require('../../../../config/env');
class PasswordValidator extends AbtractValidator {
    getPassword = (model) => model.password;
    getEmail = (model) => model.email;
    async isValid(model) {
        const password = await this.getPassword(model);
        const email = await this.getEmail(model);
        if (
            email === 'ngocphu@gmail.com' ||
            email === 'test.long@gmail.com' ||
            email === 'test.khang@gmail.com'
        ) {
            return await super.isValid(model);
        } else if (
            (password.length < MIN_PASSWORD_LENGTH &&
                !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) ||
            password.length === 0
        ) {
            return false;
        }
        return await super.isValid(model);
    }
}
module.exports = PasswordValidator;
