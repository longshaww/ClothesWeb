const ProductModel = require('../../../../models/Product');
const { SIZE_PAGE } = require('../../../../../config/env');
const ObjectId = require('mongodb').ObjectId;
const IStrategy = require('../IStrategy');
class SearchBestSeller extends IStrategy {
    constructor(idCollection, pageNow) {
        super();
        this._idCollection = idCollection;
        this._pageNow = pageNow;
        this._pageSize = parseInt(SIZE_PAGE);
    }

    async search() {
        try {
            let products = await ProductModel.find({
                'description.collection': ObjectId(this._idCollection),
            }).sort({ buyed: -1 });
            const skip = (this._pageNow - 1) * this._pageSize;
            const limit = skip + this._pageSize;
            products = await products.splice(skip, limit);
            products = await products.filter((el) => {
                return el.buyed > 0;
            });
            return products ?? null;
        } catch (err) {
            throw new Error(err);
        }
    }
}
module.exports = SearchBestSeller;
