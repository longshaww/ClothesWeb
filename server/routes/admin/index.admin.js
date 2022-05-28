const  billRoute =  require("./bill.admin.route");
const userRoute = require("./user.admin.route");
const productRoute = require("./product.admin.route");
const dashboard = require("./dashboard.admin.route");
function routeAdmin(app) {
	app.use("/bills", billRoute);
	app.use("/users",userRoute);
	app.use("/products",productRoute);
	app.use("/dashboard",dashboardRoute);
}
module.exports = routeAdmin;
