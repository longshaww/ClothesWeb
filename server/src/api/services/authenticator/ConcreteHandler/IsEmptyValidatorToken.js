const jwt = require('jsonwebtoken');
const AbtractValidator = require('../AbtractValidator');

class IsEmptyValidatorToken extends AbtractValidator {
    async isValid(model) {
        try {
            const token = await this.getAccessToken(model).trim();
            if (
                token.length === 0 ||
                token === undefined ||
                token === null ||
                model == null ||
                model == undefined ||
                model == {}
            ) {
                return false;
            }
            return super.isValid(model);
        } catch (err) {
            throw new Error(err.message);
        }
    }
    getAccessToken(model) {
        const author = model.headers.authorization;
        return author.split(' ')[1];
    }
}
module.exports = IsEmptyValidatorToken;
