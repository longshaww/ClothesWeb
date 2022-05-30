const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const siteController = require("../../controllers/user/SiteController");
const stripe = require("stripe")(
	"sk_test_51KwO8iLbEwIz3CNxDmcyHUOdMcLCUa7UUu5Y7ltmoH8ogGdBSRDoYYwSvrxO1gNt97l6RUMclbvhBN4D5dmTZmMe00no4A2QPu"
);
router.get("/", siteController.getAllSite);
router.get("/search", siteController.searchView);
router.get("/getlocation", siteController.getLocation);
router.post("/create-payment-intent", siteController.chargePayment);

module.exports = router;
