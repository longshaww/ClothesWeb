const EmailValidator = require('./ConcreteHandler/EmailValidator');
const IsEmptyValidator = require('./ConcreteHandler/IsEmptyValidator');
const PasswordValidator = require('./ConcreteHandler/PasswordValidator');
const VerifyAdminValidator = require('./ConcreteHandler/VerifyAdminValidator');
const VerifyValidator = require('./ConcreteHandler/VerifyValidator');
const ValidatorChainBuilder = require('./ValidatorChainBuilder');
class ValidatorService {
    constructor() {
        this.validators = {
            ACCOUNT_INFO: new ValidatorChainBuilder()
                .add(new IsEmptyValidator())
                .add(new EmailValidator())
                .getFirst(),
        };
    }
    async performValidation(model) {
        const step = model.currentStep;
        return await this.validators[step].isValid(model);
    }
}
module.exports = ValidatorService;
