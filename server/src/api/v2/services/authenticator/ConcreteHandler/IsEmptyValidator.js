const jwt = require('jsonwebtoken');
const AbtractValidator = require('../AbtractValidator');

class IsEmptyValidator extends AbtractValidator {
    async isValid(model) {
        const password = await this.getPassword(model).trim();
        if (model == null || model == undefined || model == {}) {
            return false;
        }
        return super.isValid(model);
    }
    getPassword(model) {
        return model.password;
    }
}
module.exports = IsEmptyValidator;
