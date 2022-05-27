const collectionsRoute = require("./user/collections.route");
const siteRoute = require("./user/site.route");
const productRoute = require("./user/products.route");
const cartRoute = require("./user/cart.route");
const authJWTRoute = require("./auth.JWT.route");
const billRoute = require("./user/bill.route");
const authCookieRoute = require("./auth.cookie.route");
const adminRoutes =  require("../routes/admin/index.admin");
const {verifyAdmin} = require("../middlewares/auth.middleware");

function route(app) {
	app.use("/", siteRoute);
	app.use("/collections", collectionsRoute);
	app.use("/product", productRoute);
	app.use("/cart", cartRoute);
	app.use("/bill", billRoute);
	app.use("/authCookie", authCookieRoute);
	//
	app.use("/authJWT", authJWTRoute);
	app.use("/admin",verifyAdmin,adminRoutes);
}
module.exports = route;
