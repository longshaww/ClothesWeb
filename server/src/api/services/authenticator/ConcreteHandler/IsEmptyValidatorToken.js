const jwt = require('jsonwebtoken');
const AbtractValidator = require('../AbtractValidator');

class IsEmptyValidatorToken extends AbtractValidator {
    async isValid(model) {
        try {
            const token = await this.getAccessToken(model);
            if (token === null) {
                return false;
            }
            return super.isValid(model);
        } catch (err) {
            throw new Error(err.message);
        }
    }
    getAccessToken(model) {
        const author = model.headers.authorization;
        return author === undefined ? null : author.split(' ')[1];
    }
}
module.exports = IsEmptyValidatorToken;
