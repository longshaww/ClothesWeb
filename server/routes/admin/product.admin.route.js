const express = require("express");
const router = express.Router();
const productAdminController = require("../../controllers/admin/ProductAdminController");


router.get("/getAllProduct",productAdminController.getAllProduct);
router.post("/createProduct",productAdminController.createProduct);
router.get("/detailProduct/:id",productAdminController.ProductDetail)
router.post("/editProduct/:id",productAdminController.editProduct);
module.exports = router;
