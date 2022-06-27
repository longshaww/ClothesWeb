const Product = require("../../models/Product");
const Bill = require("../../models/Bills");
const moment = require("moment");
var ObjectId = require("mongodb").ObjectId;
const { detailProduct, getListProduct } = require("../../utils/service");
class ProductAdminController {
    async getAllProduct(req, res, next) {
        return getListProduct(req, res, next);
    }

    async createProduct(req, res, next) {
        try {
            const customData = {
                nameProduct: req.body.nameProduct,
                price: req.body.price,
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
            return product ? detailProduct(req.params.id, res, next) : res.status(404).json({
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
        try {
            const idProduct = req.params.id;
            if (idProduct !== "" || idProduct !== undefined || idProduct !== null) {
                return detailProduct(idProduct, res, next);
            }
            else {
                res.status(404).json({
                    success: false,
                    msg: "Param bị lỗi"
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
    async deleteProduct(req, res, next) {
        Product.deleteOne({ "_id": ObjectId(req.params.id) })
            .then(() => {
                return getListProduct(req, res, next)
            })
            .catch(next)
    }
    async editImage(req, res, next) {
        try {
            const filename = req.file.filename;
            const index = req.body.index;
            if (req.params.id !== "" || req.params.id !== undefined || req.params.id !== null) {
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
                    await productUpdate ? detailProduct(req.params.id, res, next) : res.status(404).json({
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

                    await productUpdate ? detailProduct(req.params.id, res, next) : res.status(404).json({
                        success: false,
                        msg: "FAILED"
                    })
                }
            }
            else {
                res.status(404).json({
                    success: false,
                    msg: "Param bị lỗi"
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