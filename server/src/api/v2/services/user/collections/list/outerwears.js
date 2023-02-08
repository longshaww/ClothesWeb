const {OUTERWEARS} = require('../../../../../../config/env');
const ProductsObject = require('../products');
// Concrete Creator

class Outerwears extends ProductsObject{
    constructor () {
        super(OUTERWEARS)
    }
}
module.exports = Outerwears