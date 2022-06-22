const express = require("express");
const router = express.Router();
const { storage } = require("../../utils/function");
const multer = require("multer");
const upload = multer({storage: storage});
const productAdminController = require("../../controllers/admin/ProductAdminController");



router.get("/getAllProduct",productAdminController.getAllProduct);
router.post("/createProduct",productAdminController.createProduct);
router.get("/detailProduct/:id",productAdminController.ProductDetail)
router.post("/editProduct/:id",upload.single("image"),productAdminController.editProduct);
router.delete("/deleteProduct/:id",productAdminController.deleteProduct);


module.exports = router;
