class ProductMangerService{
    constructor(command)
    {
        this._command = command;
    }

    async run(){
        return await this._command.execute();
    }
}

module.exports = ProductMangerService;