const collectionsRoute = require("./collections.route");
const siteRoute = require("./site.route");
const productRoute = require("./products.route");
const cartRoute = require("./cart.route");

function route(app) {
	app.use("/", siteRoute);
	app.use("/collections", collectionsRoute);
	app.use("/product", productRoute);
	app.use("/cart", cartRoute);
}
module.exports = route;
