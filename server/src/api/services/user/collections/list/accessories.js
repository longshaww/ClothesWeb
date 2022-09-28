const {ACCESSORIES} = require('../../../../../config/env');
const ProductsObject = require('../products');
class Accessories extends ProductsObject{
    constructor () {
        super(ACCESSORIES)
      }
}
module.exports = Accessories