const express = require("express");
const router = express.Router();
const productAdminController = require("../../controllers/admin/ProductAdminController");
router.get("/",(req,res,next)=>{
        res.send("hello");
})
router.post("/createProduct",productAdminController.createProduct);
router.post("/editProduct/:id",productAdminController.editProduct);
module.exports = router;
