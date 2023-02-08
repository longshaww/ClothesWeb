const {BOTTOMS} = require('../../../../../../config/env');
const ProductsObject = require('../products');
// Concrete Creator

class Bottoms extends ProductsObject{
    constructor () {
        super(BOTTOMS)
    }
}
module.exports = Bottoms