const IManager = require('../IManager');
const ProductManager = require('../ProductManager');
class CommandGetList extends IManager {
    constructor()
    {
        super()   
    }

    execute()
    {
        const productManager = new ProductManager();
        return productManager.getList();
    }
}
module.exports = CommandGetList;
