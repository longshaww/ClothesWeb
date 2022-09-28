const Products = require('../../models/Product');
var ObjectId = require('mongodb').ObjectId;
const HandleError = require('../../utils/HandleError');
const { logError } = require('../../utils/helper');
const pageSize = 12;
const CollectionsService = require('../../services/user/collections/index');
const validator = require('../../utils/validator');
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
    async getAllProduct(req, res, next) {
        const selection = req.body.selection;
        const pageNow = parseInt(req.query.page);
        const skip = (pageNow - 1) * pageSize;
        const newArrivals = await Products.find().skip(skip).limit(pageSize);
        newArrivals
            ? res.status(202).json(newArrivals)
            : res.status(404).json({
                  success: false,
                  msg: 'NOT HAVE DATA',
              });
    }

    async getHomeNewArrivals(req, res, next) {
        // data fake
        const idFake = '6295e2c2edafd2b5ebe66cd3';
        let listProduct = [];
        const product = await Products.find({
            'description.collection': ObjectId(idFake),
        });
        for (var i = 0; i < 15; i++) {
            listProduct.push(product[i]);
        }
        res.json({
            success: true,
            products: listProduct,
        });
    }

    // GETNEWARRIVALS 15 PRODUCTS
    async get15NewArrivals(req, res) {
        const idFake = '6295e2c2edafd2b5ebe66cd3';
        const newArrivals = await Products.find({
            'description.collection': ObjectId(idFake),
        });
        const listProduct = await newArrivals.splice(7, 6);
        res.send({
            success: true,
            listProduct,
        });
    }
}

module.exports = new CollectionsController();
