<<<<<<< HEAD
const express = require("express");
const router = express.Router();

const siteController = require("../controllers/SiteController");

router.get("/",siteController.getAllSite);
=======
const express = require('express');
const router = express.Router();

const siteController =  require('../controllers/SiteController');


router.get('/',siteController.Home);
>>>>>>> 7507dad22799e6cfe59c9dfbb1e9d336d5cfccdb


module.exports = router;