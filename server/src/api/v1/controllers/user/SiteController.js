const ProductsModel = require('../../models/Product');
const fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { calculateOrderAmount } = require('../../utils/helper.js');
const SearchService = require('../../services/user/search/index');

class SiteController {
    async getProducts(req, res) {
        try {
            const products = await ProductsModel.find()
                .populate('description.type')
                .populate('description.collection');
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    getAllSite(req, res, next) {
        res.send({
            success: true,
            message: 'Welcome to Phu Le and Long Tran server',
        });
    }

    async searchView(req, res, next) {
        try {
            const keyWord = req.query.q;
            const pageNow = req.query.page;
            const dataInput = {
                methodType: 'all',
                keyWord,
                pageNow,
            };
            let searchService = new SearchService(dataInput);
            let products = await searchService.execute();
            products
                ? res.status(200).json({
                      success: true,
                      products: products,
                  })
                : res.status(404).json({
                      success: false,
                      msg: 'FAILED FIND',
                  });
        } catch (err) {
            throw new Error(err);
        }
    }

    //[GET] /getLocation
    getLocation(req, res, next) {
        const rawdata = fs.readFileSync('crawldata/data/datadangkyvitir.json');
        const data = JSON.parse(rawdata);

        return res.status(202).send(data);
    }

    async getAllProduct(req, res, next) {
        let listProduct = [];
        const product = await ProductsModel.find({});
        for (var i = 0; i < 15; i++) {
            listProduct.push(product[i]);
        }
        res.json({
            success: true,
            products: listProduct,
        });
    }
    async chargePayment(req, res, next) {
        const { items } = req.body;

        try {
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(items),
                currency: 'usd',
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.status(200).send({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

module.exports = new SiteController();
