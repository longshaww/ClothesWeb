const Product = require("../../models/Product");
class ProductAdminController
 {
    async getALlProduct(req,res,next)
    {
        const listProduct = await Product.find({})
        res.status(200).json({
            success: true,
            listProduct
        })
    }

     createProduct(req,res,next)
    {
        try{
            const product  = new Product(req.body);
            product.save();
            res.status(202).json({
                success: true,
                msg : "SUCCESS"
            })
        }
        catch(err)
        {
            console.log(err)
            res.status(404).json({
                success: false,
                msg : "FAILED"
            })
        }
    }
    async editProduct(req,res,next)
    {
        await Product.updateOne({_id:req.params.id},req.body)
        res.status(200).json({
            success: true,
            msg : "SUCCESS"
        })

    }
 }
 module.exports = new ProductAdminController();