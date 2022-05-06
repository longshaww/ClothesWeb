const collectionsRoute = require("./collections.route");
const siteRoute = require("./site.route");
const productRoute = require("./products.route");
const cartRoute = require("./cart.route");
const authRoute = require("./auth.route");
function route(app) {
	app.use("/", siteRoute);
	app.use("/collections", collectionsRoute);
	app.use("/product", productRoute);
	app.use("/cart", cartRoute);
	app.use("/auth",authRoute);
}
module.exports = route;
