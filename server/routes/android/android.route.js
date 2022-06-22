const express = require("express");
const billRoute = require("./android.bill.route");
const authRoute = require("./android.auth.route");
const collectionRoute = require("./android.collection.route");

const router = express.Router();

router.use("/collection", collectionRoute);
router.use("/bill", billRoute);
router.use("/auth", authRoute);

module.exports = router;
