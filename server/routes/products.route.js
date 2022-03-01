const express = require("express");
const router = express.Router();
const Products = require("../controllers/products.controller");

// const upload = require("../utils/multer");

router.get("/", Products.getProducts);
// router.post("/", upload.single("image"), controller.postRoom);

// router.get("/:id", controller.viewRoom);

module.exports = router;
