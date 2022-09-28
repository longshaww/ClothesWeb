const {NEWARRIVALS} = require('../../../../../config/env');
const ProductsObject = require('../products');
// Concrete Creator

class NewArrivals extends ProductsObject{
    constructor () {
        super(NEWARRIVALS)
    }
}
module.exports = NewArrivals