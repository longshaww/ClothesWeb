const { checkIfNameOrNot } = require('../../../../utils/function');
const { SIZE_PAGE } = require('../../../../../config/env');
const ProductModel = require('../../../../models/Product');
const ObjectId = require('mongodb').ObjectId;
const IStrategy = require('../IStrategy');
class SearchPriceAscending extends IStrategy {
    constructor(idCollection, pageNow) {
        super();
        this._idCollection = idCollection;
        this._pageNow = pageNow;
        this._pageSize = parseInt(SIZE_PAGE);
    }
    async search() {
        try {
            const idCollection = this._idCollection;
            console.log(idCollection);
            const skip = (this._pageNow - 1) * this._pageSize;
            const limit = skip + this._pageSize;
            const listProducts = await ProductModel.find({
                'description.collection': ObjectId(idCollection),
            });
         
             await listProducts.sort((a, b) => {
                return a.price - b.price;
            });

            return await listProducts.splice(skip, limit);
        } catch (err) {
            throw new Error(err);
        }
    }
}
module.exports = SearchPriceAscending;
