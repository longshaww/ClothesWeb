const express = require("express");
const router = express.Router();

const collectionsController = require("../../controllers/user/CollectionsController");

router.get("/", collectionsController.getAllProduct);
router.get("/new-arrivals", collectionsController.getAllNewArrivals);
router.get("/new-arrivals-home", collectionsController.getHomeNewArrivals);

router.get("/get-15-newarrivals", collectionsController.get15NewArrivals);

router.get("/tops", collectionsController.getAllTops);

router.get("/bottoms", collectionsController.getAllBottoms);

router.get("/accessories", collectionsController.getAllAccessories);

router.get("/outerwears", collectionsController.getAllOuterwears);

module.exports = router;
