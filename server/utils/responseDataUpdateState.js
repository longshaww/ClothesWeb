const Product = require("../models/Product");
var ObjectId = require("mongodb").ObjectId;
module.exports = {
    detailProduct: async (id, res, next) => {
        try {
            const product = await Product.findOne({ "_id": ObjectId(id) }).populate('description.collection').exec()

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
        catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message
            })
        }

    },
    getListProduct: async (req, res, next) => {
        try {
            const listProduct = await Product.find()
                .populate('description.collection').exec()

            let listDataCustom = [];

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
        catch (err) {
            res.json(404).staus({
                success: false,
                msg: err.message
            })
        }

    }
}