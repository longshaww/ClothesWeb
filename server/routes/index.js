const collectionsRoute =  require('./collections.route');
const siteRoute = require('./site.route');
function route(app)
{
    app.use("/",siteRoute);
    app.use("/collections",collectionsRoute);
}
module.exports = route