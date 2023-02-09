const express = require('express');
const router = express.Router();
const productController = require('../../controllers/user/ProductController');

router.get('/:id', productController.getProductDetail);
router.get('/rate/:productID', productController.getProductReview);

module.exports = router;
