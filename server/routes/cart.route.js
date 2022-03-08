const express = require("express");
const router = express.Router();

const cartCollection = require("../controllers/CartController");

router.post("/", cartCollection.addToCart);
router.get("/", cartCollection.getCart);

module.exports = router;
