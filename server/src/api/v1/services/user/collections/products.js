const { SIZE_PAGE } = require('../../../../../config/env');
const { Product } = require('../../../models/index');
const ObjectId = require('mongodb').ObjectId;
const { filterQty } = require('../../../utils/helper');

class ProductsObject {
    constructor(idCollection) {
        this.pageSize = parseInt(SIZE_PAGE);
        this.idCollection = idCollection;
    }

    async findProducts(pageNow) {
        try {
            const skip = (pageNow - 1) * this.pageSize;
            let listProducts = await Product.find({
                'description.collection': ObjectId(this.idCollection),
            })
                .skip(skip)
                .limit(this.pageSize);
            listProducts = await filterQty(listProducts);
            return listProducts ?? null;
        } catch (err) {
            return null;
        }
    }
    async getProductDetail() {
        try {
            const product = await Product.findById(this.idCollection);
            return product ?? null;
        } catch (err) {
            return null;
        }
    }
}
module.exports = ProductsObject;
