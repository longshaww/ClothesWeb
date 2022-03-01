<<<<<<< HEAD
const collectionsRoute =  require('./collections.route');
const siteRoute = require('./site.route');
function route(app)
{
    app.use("/",siteRoute);
    app.use("/collections",collectionsRoute);
=======
const collectionsRoute = require('../routes/collections.route');
const siteRoute =  require ('./site.route');
const ``
function route(app)
{
    app.use("/",siteRoute);
    app.use("/collections",collectionsRoute);z
    
    app.use("/",)
>>>>>>> 7507dad22799e6cfe59c9dfbb1e9d336d5cfccdb
}
module.exports = route