const productRoute = require('./products.route');
function route(app)
{
    app.use("/",productRoute);
}
module.exports = route