const Products = require('../../models/Product');
var ObjectId = require('mongodb').ObjectId;
const HandleError = require('../../utils/HandleError');
const { logError } = require('../../utils/helper');
const pageSize = 12;
const CollectionsService = require('../../services/user/collections/index');
const validator = require('../../utils/validator');
const NewArrivals = require('../../services/user/collections/list/new-arrivals');
class CollectionsController {
    async getListCollection(req, res, next) {
        try {
            const pageNow = parseInt(req.query.page);
            const keyWordParams = req.params.nameCollection;
            const collectionsService = new CollectionsService(keyWordParams);
            const listProduct = await collectionsService.createCollection().then((object) => {
                return object.findProducts(pageNow);
            });
            validator(listProduct, 'isEmpty')
                ? res.status(200).json(listProduct)
                : res.status(404).json({
                      success: false,
                      msg: 'NOT FOUND',
                  });
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
    // GETNEWARRIVALS 15 PRODUCTS
    async get15NewArrivals(req, res) {
        try {
            console.log('vao');
            const newArrivalsObject = new NewArrivals();
            const listProduct = await newArrivalsObject.getProductLimit15();
            validator(listProduct, 'isEmpty')
                ? res.status(200).json({
                      success: true,
                      listProduct,
                  })
                : res.status(404).json({
                      success: false,
                      msg: 'NOT FOUND',
                  });
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
}

module.exports = new CollectionsController();
