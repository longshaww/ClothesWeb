const IManager = require('../IManager');
const ProductManager = require('../ProductManager');
class CommandDelete extends IManager {
    constructor(id)
    {
        super()
        this._idProduct = id;   
    }

    async execute(){
        const productManager = new ProductManager();
        return await productManager.delete(this._idProduct);

    }
}
module.exports = CommandDelete;
