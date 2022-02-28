const collectionsRoute = require('../routes/collections.route');
const siteRoute =  require ('./site.route');
const ``
function route(app)
{
    app.use("/",siteRoute);
    app.use("/collections",collectionsRoute);z
    
    app.use("/",)
}
module.exports = route