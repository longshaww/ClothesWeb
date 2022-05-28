const express = require("express");
const router = express.Router();
const productController = require("../../controllers/user/ProductController");


router.get("/:id", productController.getProductDetail);



module.exports = router;
