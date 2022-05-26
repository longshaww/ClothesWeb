const collectionsRoute = require("./collections.route");
const siteRoute = require("./site.route");
const productRoute = require("./products.route");
const cartRoute = require("./cart.route");
const authRoute = require("./auth.route");
const billRoute = require("./bill.route");
const authCookieRoute = require("./auth.cookie.route");
const adminRoute = require("./admin.route");
function route(app) {
	app.use("/", siteRoute);
	app.use("/collections", collectionsRoute);
	app.use("/product", productRoute);
	app.use("/cart", cartRoute);
	app.use("/auth", authRoute);
	app.use("/bill", billRoute);
	app.use("/authCookie", authCookieRoute);
	app.use("/admin",adminRoute);
}
module.exports = route;
