const IValidator = require('./IValidator');   
class AbtractValidator{
  
    isValid(model) {
        if (this.nextValidator != null) {
          return this.nextValidator.isValid(model);
        }
        return true;
      }
      
      setNextValidator(validator) {
        this.nextValidator = validator;
      }
    
}

module.exports = AbtractValidator;
