const IManager = require('../IManager');
const ProductManager = require('../ProductManager');
class CommandEditImage extends IManager {
    constructor(filename, index, paramsId)
    {
        super()   
        this._fileName = filename ; 
        this._index = index ; 
        this._paramsId = paramsId ;
    }
    
    
   async execute()
    {
        const productManager = new ProductManager();
        return await productManager.editImage(this._fileName,this._index,this._paramsId);
    }
}
module.exports = CommandEditImage;
