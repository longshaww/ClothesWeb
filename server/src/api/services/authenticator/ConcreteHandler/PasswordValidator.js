const AbtractValidator = require('../../authenticator/AbtractValidator')

class PasswordValidator extends AbtractValidator {
    getPassword = (model) => model.password;

    isValid(model) {
        const password = this.getPassword(model).trim();
        if (
            password.length < MIN_PASSWORD_LENGTH &&
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)
        ) {
          return false;
        }
        return super.isValid(model);
    }
}
module.exports = PasswordValidator;
