const express = require('express');
const router = express.Router();

const collectionsController = require('../../controllers/user/CollectionsController');

router.get('/get-15-newarrivals', collectionsController.getHots);

router.get('/:nameCollection', collectionsController.getListCollection);

module.exports = router;
