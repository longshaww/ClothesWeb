const express = require("express");
const router = express.Router();
const productController = require("../../controllers/user/ProductController");

// const upload = require("../utils/multer");

router.get("/:id", productController.getProductDetail);
// router.post("/", upload.single("image"), controller.postRoom);

// router.get("/:id", controller.viewRoom);

module.exports = router;
