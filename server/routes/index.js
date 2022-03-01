const collectionsRoute =  require('./collections.route');
const siteRoute = require('./site.route');
const productRoute = require('./products.route');
function route(app)
{
    app.use("/",siteRoute);
    app.use("/collections",collectionsRoute);
    app.use("/product",productRoute);
}
module.exports = route