const Product = require("../models/Product");
var ObjectId = require("mongodb").ObjectId;
module.exports = {
    detailProduct : async (id,res,next)=>{
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
}