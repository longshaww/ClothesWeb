const Product = require("../../models/Product");
const Bill = require("../../models/Bills");
const moment = require("moment");
var ObjectId = require("mongodb").ObjectId;

class ProductAdminController {
    async getAllProduct(req, res, next) {
        const listProduct = await Product.find()
            .populate('description.collection').exec()

        let listDataCustom = [];
        let count = 0;
        
        Promise.all(listProduct.map(async (el) => {
            let customData = {
                id: el['_id'],
                nameProduct: el['nameProduct'],
                price: el['price'] + ",000 VND",
                image: el.description.imageList[0],
                collections: el.description.collection.typeName,
                sizeXL: el.size[0].qty,
                sizeL: el.size[1].qty,
                sizeM: el.size[2].qty,
            }
            await listDataCustom.push(customData);

        }))
        res.status(200).json({
            success: true,
            listDataCustom
        })
    }

    async createProduct(req, res, next) {
        try {
            console.log()
            const customData = {
                nameProduct: req.body.nameProduct,
                price : req.body.price,
                size: [{
                    sizeName: "XL",
                    qty: req.body.sizeXL
                },
                {
                    sizeName: "L",
                    qty: req.body.sizeL
                },
                {
                    sizeName: "M",
                    qty: req.body.sizeM
                }],
                description: {
                    imageList: [`${process.env.API_HOST}${req.files[0].filename}`, `${process.env.API_HOST}${req.files[1].filename}`],
                    productDes: req.body.productDes,
                    price: req.body.price,
                    type: null,
                    collection: req.body.idCollection
                },
                discount: null
            }
            const product = await new Product(customData);
            await product.save();
            res.status(202).json({
                success: true,
                msg: "SUCCESS",
                product
            })
        }
        catch (err) {
            console.log(err)
            res.status(404).json({
                success: false,
                msg: "FAILED"
            })
        }
    }
    async editProduct(req, res, next) {
        try {
            let customArraySize = [
                {
                    sizeName: "XL",
                    qty: req.body.sizeXL
                },
                {
                    sizeName: "L",
                    qty: req.body.sizeL
                },
                {
                    sizeName: "M",
                    qty: req.body.sizeM
                }
            ]

            const product = await Product.updateOne({ "_id": req.params.id },
                {
                    $set: {
                        "nameProduct": req.body.nameProduct,
                        "price": req.body.price,
                        "size": customArraySize,
                        "description.collection": req.body.idCollection
                    }
                })
            product ? res.status(200).json({
                success: true,
                product
            }) : res.status(404).json({
                success: false,
                msg: "FAILED"
            })
        }
        catch (err) {
            console.log(err);
            res.status(404).json({
                success: false,
                msg: err.message
            })
        }
    }

    async ProductDetail(req, res, next) {

        const product = await Product.findOne({ "_id": ObjectId(req.params.id) }).populate('description.collection').exec()

        let customData = {
            nameProduct: product.nameProduct,
            price: product.price,
            sizeM: product.size[2].qty,
            sizeL: product.size[1].qty,
            sizeXL: product.size[0].qty,
            image1: product.description.imageList[0],
            image2: product.description.imageList[1],
            description: product.description.productDes,
            collection: product.description.collection.typeName

        };
        res.status(200).json({
            success: true,
            customData
        })
    }
    async deleteProduct(req, res, next) {
        Product.deleteOne({ "_id": ObjectId(req.params.id) })
            .then(() => {
                res.status(200).json({
                    success: true,
                    msg: "SUCCESS"
                })
            })
            .catch(next)
    }
    async editImage(req, res, next) {
        try {
            const filename = req.file.filename;
            const index = req.body.index;
            if (index === "1") {
                const product = await Product.findOne({ "_id": req.params.id });
                let customArray = [
                    `${process.env.API_HOST}${filename}`,
                    product.description.imageList[1]
                ]
                const productUpdate = await Product.updateOne({ "_id": req.params.id },
                    {
                        $set: {
                            "description.imageList": customArray
                        }
                    })

                product ? res.status(200).json({
                    success: true,
                    productUpdate
                }) : res.status(404).json({
                    success: false,
                    msg: "FAILED"
                })
            }
            else {
                const product = await Product.findOne({ "_id": req.params.id });
                let customArray = [
                    product.description.imageList[0],
                    `${process.env.API_HOST}${filename}`,
                ];
                const productUpdate = await Product.updateOne({ "_id": req.params.id },
                    {
                        $set: {
                            "description.imageList": customArray
                        }
                    })

                product ? res.status(200).json({
                    success: true,
                    productUpdate
                }) : res.status(404).json({
                    success: false,
                    msg: "FAILED"
                })
            }
        }
        catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message
            })
        }

    }
}
module.exports = new ProductAdminController();