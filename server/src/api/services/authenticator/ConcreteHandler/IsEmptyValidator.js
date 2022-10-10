const jwt = require('jsonwebtoken');
const AbtractValidator = require('../AbtractValidator');

class VerifyValidator extends AbtractValidator {
    getEmail = (model) => model.email;
    getPassword = (model) => model.password;
    async isValid(model) {
        const email = await this.getEmail(model).trim();
        const password = await this.getPassword(model).trim();
        if (
            email.length === 0 ||
            password.length === 0 ||
            model == null ||
            model == undefined ||
            model == {}
        ) {
            return false;
        }
        return await super.isValid(model);
    }
}
module.exports = VerifyValidator;
