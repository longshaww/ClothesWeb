<<<<<<< HEAD
const express = require("express");
const router = express.Router();

const collectionsController =  require('../controllers/CollectionsController');

router.get("/new-arrivals",collectionsController.getAllNewArrivals);
router.get("/tops",collectionsController.getAllTops);
router.get("/bottoms",collectionsController.getAllBottoms);
router.get("/accessories",collectionsController.getAllAccessories);
router.get("/outerwears",collectionsController.getAllOuterwears);
=======
const express = require('express');
const router = express.Router();

const collectionsController = require('../controllers/CollectionsController');

router.get("/new-arrivals",collectionsController.newArrivals);


>>>>>>> 7507dad22799e6cfe59c9dfbb1e9d336d5cfccdb

module.exports = router;