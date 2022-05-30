const collectionsRoute = require("./user/collections.route");
const siteRoute = require("./user/site.route");
const productRoute = require("./user/products.route");
const cartRoute = require("./user/cart.route");
const authJWTRoute = require("./auth.JWT.route");
const billRoute = require("./user/bill.route");
const authCookieRoute = require("./auth.cookie.route");
const { verifyAdmin } = require("../middlewares/auth.middleware");
const billAdminRoute = require("../routes/admin/bill.admin.route");
const productAdminRoute = require("../routes/admin/product.admin.route");
const userAdminRoute = require("../routes/admin/user.admin.route");
const dashboardAdminRoute = require("../routes/admin/dashboard.admin.route");
const androidRoute = require("../routes/android/android.route");
function route(app) {
	app.use("/", siteRoute);
	app.use("/android", androidRoute);
	app.use("/collections", collectionsRoute);
	app.use("/product", productRoute);
	app.use("/cart", cartRoute);
	app.use("/bill", billRoute);
	app.use("/authCookie", authCookieRoute);
	//
	app.use("/authJWT", authJWTRoute);
	app.use("/admin/bills", verifyAdmin, billAdminRoute);
	app.use("/admin/products", verifyAdmin, productAdminRoute);
	app.use("/admin/users", verifyAdmin, userAdminRoute);
	app.use("/admin/dashboard", verifyAdmin, dashboardAdminRoute);
}
module.exports = route;
