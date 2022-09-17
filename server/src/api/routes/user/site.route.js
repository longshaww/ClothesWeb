const express = require("express");
const router = express.Router();
const siteController = require("../../controllers/user/SiteController");

router.get("/", siteController.getAllSite);
router.get("/search", siteController.searchView);
router.get("/getLocation", siteController.getLocation);
router.post("/create-payment-intent", siteController.chargePayment);

module.exports = router;
