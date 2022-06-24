const express = require("express");
const router = express.Router();
const { storage } = require("../../utils/function");
const multer = require("multer");
const upload = multer({storage: storage});
const productAdminController = require("../../controllers/admin/ProductAdminController");


router.get("/getAllProduct",productAdminController.getAllProduct);
router.post("/createProduct",upload.array('image', 12),productAdminController.createProduct);
router.get("/detailProduct/:id",productAdminController.ProductDetail)
router.put("/editProduct/:id",productAdminController.editProduct);
router.put("/editImage/:id",upload.single('image'),productAdminController.editImage);
router.delete("/deleteProduct/:id",productAdminController.deleteProduct);


module.exports = router;
