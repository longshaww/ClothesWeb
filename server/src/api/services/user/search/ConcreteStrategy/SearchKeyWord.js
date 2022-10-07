const ProductModel = require('../../../../models/Product');
const { SIZE_PAGE } = require('../../../../../config/env');
const IStrategy = require('../IStrategy');
const { filterQty } = require('../../../../utils/helper');
class SearchKeyword extends IStrategy {
    constructor(keyword, pageNow) {
        super();
        this._keyword = keyword;
        this._pageNow = pageNow;
        this._pageSize = parseInt(SIZE_PAGE);
    }

    async search() {
        const q = this._keyword;
        let resProduct;
        try {
            const products = await ProductModel.find();
            if (q) {
                let listProduct = await products.filter((product) => {
                    return product.nameProduct.toLowerCase().indexOf(q.toLowerCase()) !== -1;
                });
                const skip = (this._pageNow - 1) * this._pageSize;
                const limit = skip + this._pageSize;
                resProduct = listProduct.splice(skip, limit);
                resProduct = await filterQty(resProduct);
            }
            return resProduct ?? null;
        } catch (err) {
            return null;
        }
    }
}
module.exports = SearchKeyword;
