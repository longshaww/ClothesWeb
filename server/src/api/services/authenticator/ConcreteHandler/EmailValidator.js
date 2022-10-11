const AbtractValidator = require('../../authenticator/AbtractValidator');
class EmailValidator extends AbtractValidator {
    async isValid(model) {
        const email = await this.getEmail(model);
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return super.isValid(model);
        }
        return false;
    }
    async getEmail(model) {
        return model.email;
    }
}

module.exports = EmailValidator;
