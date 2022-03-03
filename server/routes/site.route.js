const express = require("express");
const router = express.Router();

const siteController = require("../controllers/SiteController");

router.get("/",siteController.getAllSite);
router.get("/search",siteController.searchView);


module.exports = router;