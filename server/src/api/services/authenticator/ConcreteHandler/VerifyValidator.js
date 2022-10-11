const jwt = require('jsonwebtoken');
const AbtractValidator = require('../../authenticator/AbtractValidator');
class VerifyValidator extends AbtractValidator {
    getAuthorization = (model) => {
        const author = model.headers.authorization;
        return author.split(' ')[1];
    };

    isValid(model) {
        const accessToken = this.getAuthorization(model);

        if (accessToken) {
            jwt.verify(accessToken, 'mySecretKey', (err, dataUser) => {
                if (err) {
                    return false;
                } else {
                    return dataUser;
                }
            });
        } else {
            return false;
        }
    }
}
module.exports = VerifyValidator;
