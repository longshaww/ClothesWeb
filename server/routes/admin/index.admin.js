
const  billRoute =  require("./bill.admin.route");
function routeAdmin(app) {
	app.use("/bills", billRoute);

}
module.exports = routeAdmin;