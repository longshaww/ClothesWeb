const IManager = require('../IManager');
const ProductManager = require('../ProductManager');
class CommandView extends IManager {
    constructor(idProduct)
    {
        super()   
        this._idProduct = idProduct;
    }


    execute()
    {
        const productManager = new ProductManager();
        return productManager.detailProduct(this._idProduct);
    }
}
module.exports = CommandView;
