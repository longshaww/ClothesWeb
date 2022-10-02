const { NEWARRIVALS } = require('../../../../../config/env');
const ProductsObject = require('../products');
<<<<<<< HEAD
// Concrete Creator
=======
const ProductModel = require('../../../../models/Product');
const validator = require('../../../../utils/validator');
const ObjectId = require('mongodb').ObjectId;
>>>>>>> config/designpattern

// Concrete Creator
class NewArrivals extends ProductsObject {
    constructor() {
        super(NEWARRIVALS);
    }

    async getProductLimit15() {
        try {
            console.log(this.idCollection);
            const newArrivals = await ProductModel.find({
                'description.collection': ObjectId(this.idCollection),
            });

            const listProduct = await newArrivals.splice(7, 6);
            if (!validator(listProduct, 'isEmpty')) {
                return null;
            }
            return listProduct;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
}
module.exports = NewArrivals;
