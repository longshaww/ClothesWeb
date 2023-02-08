const express = require('express');
const router = express.Router();

const cartCollection = require('../../controllers/user/CartController');

router.post('/', cartCollection.addToCart);
router.get('/', cartCollection.getCart);
router.put('/changeQty', cartCollection.changeQty);
router.delete('/:idProduct', cartCollection.deleteProduct);

module.exports = router;
