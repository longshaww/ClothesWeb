const {
    siteRoute,
    collectionRoute,
    productRoute,
    cartRoute,
    billRoute,
    userRoute,
} = require('./user');

const {
    billAdminRoute,
    userAdminRoute,
    dashboardAdminRoute,
    voucherRoute,
    productAdminRoute,
    rateAdminRoute,
} = require('./admin');

const authJWTRoute = require('./auth.JWT.route');
const { validateToken, verifyAdmin, verify } = require('../middlewares/auth.middleware');
const androidRoute = require('../routes/android/android.route');
const sessionMiddleware = require('../middlewares/session.middleware');
function route(app) {
    app.use('/', siteRoute);
    app.use('/android', androidRoute);
    app.use('/collections', collectionRoute);
    app.use('/product', productRoute);
    app.use('/cart', sessionMiddleware, cartRoute);
    app.use('/bill', billRoute);
    app.use('/voucher', voucherRoute);

    app.use('/user', validateToken, verify, userRoute);

    app.use('/authJWT', authJWTRoute);
    app.use('/admin/rate', validateToken, verify, rateAdminRoute);
    app.use('/admin/bills', validateToken, verifyAdmin, billAdminRoute);
    app.use('/admin/products', validateToken, verifyAdmin, productAdminRoute);
    app.use('/admin/users', validateToken, verifyAdmin, userAdminRoute);
    app.use('/admin/dashboard', validateToken, verifyAdmin, dashboardAdminRoute);
}
module.exports = route;
