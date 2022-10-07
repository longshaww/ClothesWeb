const Products = require('../../models/Product');
var ObjectId = require('mongodb').ObjectId;
const HandleError = require('../../utils/HandleError');
const { logError } = require('../../utils/helper');
const pageSize = 12;
const CollectionsService = require('../../services/user/collections/index');
const validator = require('../../utils/validator');
const NewArrivals = require('../../services/user/collections/list/new-arrivals');
const { returnIdCollection } = require('../../utils/helper');
const SearchService = require('../../services/user/search/index');
class CollectionsController {
    async getListCollection(req, res, next) {
        try {
            const type = req.query.type;
            const pageNow = parseInt(req.query.page);
            const keyWordParams = req.params.nameCollection;
            let listProduct;
            if (type === undefined) {
                const collectionsService = new CollectionsService(keyWordParams);
                listProduct = await collectionsService.createCollection().then((object) => {
                    return object.findProducts(pageNow);
                });
            } else if (type === 'ascending' || type === 'descending' || type === 'bestseller') {
                const idCollection = returnIdCollection(keyWordParams);
                if (idCollection === null) {
                    res.status(404).json({
                        success: false,
                        message: 'Type collection not right',
                    });
                }
                const dataInput = {
                    methodType: type,
                    idCollection,
                    pageNow,
                };
                let searchService = new SearchService(dataInput);
                listProduct = await searchService.execute();
            }
            (await validator(listProduct, 'isEmpty'))
                ? res.status(200).json(listProduct)
                : res.status(404).json({
                      success: false,
                      msg: 'NOT FOUND',
                  });
        } catch (err) {
            console.log(err);
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
    // GETNEWARRIVALS 15 PRODUCTS
    async getHots(req, res) {
        try {
            const collectionService = new CollectionsService();
            const listProduct = await collectionService.getProductHots();
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
    async search(req, res) {}
}

module.exports = new CollectionsController();
