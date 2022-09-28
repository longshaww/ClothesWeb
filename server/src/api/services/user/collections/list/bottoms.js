const {BOTTOMS} = require('../../../../../config/env');
const ProductsObject = require('../products');
class Bottoms extends ProductsObject{
    constructor () {
        super(BOTTOMS)
    }
}
module.exports = Bottoms