const {SIZE_PAGE} = require('../../../../config/env');
const ProductModel = require("../../../models/Product");
const ObjectId = require('mongodb').ObjectId;
//  Creator

class ProductsObject {
    constructor(idCollection)
    {
        this.pageSize = parseInt(SIZE_PAGE);
        this.idCollection = idCollection;
    }

    async findProducts(pageNow)
    {
        try{
            const skip = (pageNow - 1) * this.pageSize;
            const listProducts = await ProductModel.find({
                'description.collection': ObjectId(this.idCollection),
            })
                .skip(skip)
                .limit(this.pageSize);
            return listProducts ?? null;
        }
        catch(err)
        {
            return err.message;
        }
     
    } 

}
module.exports =  ProductsObject;
