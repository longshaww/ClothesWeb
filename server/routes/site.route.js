const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const siteController = require("../controllers/SiteController");



router.get("/",siteController.getAllSite);
router.get("/search",siteController.searchView);

router.get("/getlocation",siteController.getLocation);


module.exports = router;