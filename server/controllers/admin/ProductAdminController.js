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
        const d = await new Date();
        let month = d.getMonth() + 1;
        let qtyBill = 0;
        const listBillOffMonth = await Bill.aggregate([
            {
                $redact: {
                    $cond: [
                        { $eq: [{ $month: "$createdAt" }, month] },
                        "$$KEEP",
                        "$$PRUNE",
                    ],
                },
            },
        ]);
        let dataCustom =[];
        Promise.all( await listBillOffMonth.map(async (el)=>{
            let product =  await el['listProduct'].find(async (el1)=>{
                return await el1['_id'] === ObjectId(req.params.id)
            })
        
            dataCustom.push(product);
        }))
        res.send(dataCustom);
    }
}
module.exports = new ProductAdminController();