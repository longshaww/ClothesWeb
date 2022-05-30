const express = require("express");
const androidController = require("../../controllers/android/android.controller");
const router = express.Router();
router.get("/", androidController.getAllProduct);
router.get("/new-arrivals", androidController.getAllNewArrivals);
router.get("/tops", androidController.getAllTops);
router.get("/bottoms", androidController.getAllBottoms);
router.get("/accessories", androidController.getAllAccessories);
router.get("/outerwears", androidController.getAllOuterwears);

module.exports = router;
