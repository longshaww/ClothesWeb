const ValidatorChainBuilder = require('./ValidatorChainBuilder');
const {
    EmailValidator,
    IsEmptyValidator,
    PasswordValidator,
    CheckStatusBill,
    CheckBillBelongUser,
    CheckVerifyNewPassword,
    IsEmptyValidatorToken,
} = require('./ConcreteHandler/index');

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
            VALIDATE_REQUEST: async () => {
                const validators = new ValidatorChainBuilder();
                await validators.add(new IsEmptyValidatorToken());
                return (this.validators = validators.getFirst());
            },
            VALIDATE_BILL: async () => {
                const validators = new ValidatorChainBuilder();
                await validators.add(new CheckStatusBill());
                await validators.add(new IsEmptyValidatorToken());
                await validators.add(new CheckBillBelongUser());
                return (this.validators = validators.getFirst());
            },
            VALIDATE_CHANGE_PASSWORD: async () => {
                const validators = new ValidatorChainBuilder();
                await validators.add(new PasswordValidator());
                await validators.add(new CheckVerifyNewPassword());
                await validators.add(new CheckOldPassword());
                return (this.validators = validators.getFirst());
            },
            VALIDATE_NEW_PASSWORD: async () => {
                const validators = new ValidatorChainBuilder();
                await validators.add(new PasswordValidator());
                await validators.add(new CheckVerifyNewPassword());
                return (this.validators = validators.getFirst());
            },
            VALIDATE_NEW_PASSWORD_ADMIN: async () => {
                const validators = new ValidatorChainBuilder();
                await validators.add(new PasswordValidator());
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
