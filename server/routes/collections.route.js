const express = require('express');
const router = express.Router();

const collectionsController = require('../controllers/CollectionsController');

router.get("/new-arrivals",collectionsController.newArrivals);



module.exports = router;