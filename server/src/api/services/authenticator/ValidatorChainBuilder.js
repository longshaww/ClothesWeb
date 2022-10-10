class ValidatorChainBuilder {
    constructor() {
        this.first = null;
        this.last = null;
    }
     add(validator) {
        if (!this.first) {
            this.first = validator;
            this.last = validator;
            return this;
        }
       this.last.setNextValidator(validator);
       this.last = validator;
    }
    getFirst() {
        console.log('vao');
        return this.first;
    }
}
module.exports = ValidatorChainBuilder;
