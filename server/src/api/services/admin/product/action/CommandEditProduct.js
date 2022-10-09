const IManager = require('../IManager');
const ProductManager = require('../ProductManager');
class CommandEditProduct extends IManager {
    constructor(dataReq,idProduct)
    {
        super()   
        this._dataReq = dataReq;
        this._idProduct = idProduct;
    }

    execute()
    {
        const productManager = new ProductManager();
        return productManager.edit(this._dataReq,this._idProduct);
    }
}
module.exports = CommandEditProduct;
