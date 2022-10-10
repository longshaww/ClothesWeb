const jwt = require('jsonwebtoken');
const AbtractValidator = require('../../authenticator/AbtractValidator')
class VerifyValidator extends AbtractValidator {
    getAuthorization = (model) => model.authorization;

    isValid(model) {
        const authHeader = this.getAuthorization(model);
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, 'mySecretKey', (err, dataUser) => {
                if (err) {
                    return null;
                } else {
                    return dataUser;
                }
            });
        } else {
            return null;
        }
    }
}
module.exports = VerifyValidator