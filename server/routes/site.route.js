const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const siteController = require("../controllers/SiteController");
const stripe = require("stripe")(
	"sk_test_51KwO8iLbEwIz3CNxDmcyHUOdMcLCUa7UUu5Y7ltmoH8ogGdBSRDoYYwSvrxO1gNt97l6RUMclbvhBN4D5dmTZmMe00no4A2QPu"
);
router.get("/", siteController.getAllSite);
router.get("/search", siteController.searchView);
router.get("/getlocation", siteController.getLocation);

const calculateOrderAmount = (items) => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return 1400;
};

router.post("/create-payment-intent", async (req, res, next) => {
	const { items } = req.body;
	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(items),
		currency: "usd",
		automatic_payment_methods: {
			enabled: true,
		},
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
});

module.exports = router;
