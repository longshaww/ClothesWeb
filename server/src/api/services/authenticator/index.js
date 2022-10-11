const EmailValidator = require('./ConcreteHandler/EmailValidator');
const IsEmptyValidator = require('./ConcreteHandler/IsEmptyValidator');
const PasswordValidator = require('./ConcreteHandler/PasswordValidator');
const VerifyAdminValidator = require('./ConcreteHandler/VerifyAdminValidator');
const VerifyValidator = require('./ConcreteHandler/VerifyValidator');
const ValidatorChainBuilder = require('./ValidatorChainBuilder');
const IsEmptyValidatorToken = require('./ConcreteHandler/IsEmptyValidatorToken');
class ValidatorService {
    constructor() {
        this.switch = {
            VALIDATE_LOGIN: async () => {
                const validators = new ValidatorChainBuilder();
                await validators.add(new IsEmptyValidator());
                await validators.add(new EmailValidator());
                await validators.add(new PasswordValidator());
                return (this.validators = validators.getFirst());
            },
            VERIFY_USER: async () => {
                const validators = new ValidatorChainBuilder();
                await validators.add(new IsEmptyValidatorToken());
                await validators.add(new VerifyValidator());
                return (this.validators = validators.getFirst());
            },
        };
    }
    async performValidation(model) {
        const step = model.currentStep.toString();
        await this.switch[step]();
        return await this.validators.isValid(model);
    }
}
module.exports = ValidatorService;
