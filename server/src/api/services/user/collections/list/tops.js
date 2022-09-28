const {TOPS} = require('../../../../../config/env');
const ProductsObject = require('../products');
class Tops extends ProductsObject {
    constructor () {
        super(TOPS)
    }
}
module.exports = Tops