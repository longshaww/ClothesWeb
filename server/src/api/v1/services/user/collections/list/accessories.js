const {ACCESSORIES} = require('../../../../../../config/env');
const ProductsObject = require('../products');
// Concrete Creator
class Accessories extends ProductsObject{
    constructor () {
        super(ACCESSORIES)
      }
}
module.exports = Accessories