const jwt = require('jsonwebtoken');
const AbtractValidator = require('../AbtractValidator');

class IsEmptyValidator extends AbtractValidator {
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
        return super.isValid(model);
    }
    getEmail(model) {
        return model.email;
    }
    getPassword(model) {
        return model.password;
    }
}
module.exports = IsEmptyValidator;
