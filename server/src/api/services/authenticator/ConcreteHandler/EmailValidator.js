const AbtractValidator = require('../../authenticator/AbtractValidator');
class EmailValidator extends AbtractValidator {
    getEmail = (model) => model.email;

    async isValid(model) {
        const email = await this.getEmail(model).trim();
        if (!Regex(/^[a-z]$/).test(email)) {
            return false;
        }
        return await super.isValid(model);
    }
}

module.exports = EmailValidator;
