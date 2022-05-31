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
                    price: el['price'] +",000 VND",
                    image : el.description.imageList[0],
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

    createProduct(req, res, next) {
        try {
            const product = new Product(req.body);
            product.save();
            res.status(202).json({
                success: true,
                msg: "SUCCESS"
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
        await Product.updateOne({ _id: req.params.id }, req.body)
        res.status(200).json({
            success: true,
            msg: "SUCCESS"
        })
    }

    async ProductDetail(req,res,next)
    {
      
        const product = await Product.findOne({"_id" :  ObjectId(req.params.id)}).populate('description.collection').exec()
        
        let customData = {
            nameProduct : product.nameProduct,
            price : product.price,
            sizeM : product.size[2].qty,
            sizeL  : product.size[1].qty,
            sizeXL : product.size[0].qty,
            image1: product.description.imageList[0],
            image2 : product.description.imageList[1],
            description : product.description.productDes,
            collection :product.description.collection.typeName
            
        };
        res.status(200).json({
            success: true,
            customData 
        })
    }
    async deleteProduct(req, res, next) {
        Product.deleteOne({"_id":ObjectId(req.params.id)})
        .then(()=>{
            res.status(200).json({
                success: true,
                msg:"SUCCESS"
            })
        })
        .catch(next)
    }
}
module.exports = new ProductAdminController();