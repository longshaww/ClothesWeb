const express = require("express");
const router = express.Router();

const collectionsController = require("../controllers/CollectionsController");

router.get("/", collectionsController.getAllProduct);
router.get("/search", collectionsController.getFilteredProduct);
router.get("/new-arrivals", collectionsController.getAllNewArrivals);
router.get("/tops", collectionsController.getAllTops);
router.get("/bottoms", collectionsController.getAllBottoms);
router.get("/accessories", collectionsController.getAllAccessories);
router.get("/outerwears", collectionsController.getAllOuterwears);

module.exports = router;
