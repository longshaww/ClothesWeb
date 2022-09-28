const {OUTERWEARS} = require('../../../../../config/env');
const ProductsObject = require('../products');

class Outerwears extends ProductsObject{
    constructor () {
        super(OUTERWEARS)
    }
}
module.exports = Outerwears