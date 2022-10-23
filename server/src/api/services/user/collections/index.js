const Accessories = require('./list/accessories');
const Bottoms = require('./list/bottoms');
const NewArrivals = require('./list/new-arrivals');
const Outerwears = require('./list/outerwears');
const Tops = require('./list/tops');
const ProductsObject = require('./products');
const ProductModel = require('../../../models/Product');
// FACTORY || PRODUCT

class CollectionsService {
    constructor(type) {
        this.type = type;
    }

    async createCollection() {
        switch (this.type) {
            case 'new-arrivals':
                return new NewArrivals();

            case 'tops':
                return new Tops();

            case 'bottoms':
                return new Bottoms();

            case 'accessories':
                return new Accessories();

            case 'outerwears':
                return new Outerwears();

            default:
                return null;
        }
    }

    async getListProduct(pageNow) {
        try {
            const productObject = new ProductsObject();
            const products = await productObject.getListProduct(pageNow);
            if (!validator(products, 'isEmpty')) {
                return null;
            }
            return products;
        } catch (err) {
            return null;
        }
    }
    async getProductHots() {
        try {
            const products = await ProductModel.find({}).sort({ buyed: -1 }).limit(6);
            return products ?? null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    
}
module.exports = CollectionsService;
