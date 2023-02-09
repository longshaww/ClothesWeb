const IManager = require('../IManager');
const ProductManager = require('../ProductManager');
class CommandCreate extends IManager {
    constructor(dataReq,file1,file2)
    {
        super()   
        this._dataReq = dataReq;
        this._file1 = file1;
        this._file2 = file2;
    }

    execute()
    {
        const productManager = new ProductManager();
        return productManager.create(this._dataReq,this._file1,this._file2);
    }
}
module.exports = CommandCreate;
