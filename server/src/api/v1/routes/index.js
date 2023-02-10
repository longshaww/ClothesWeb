const express = require('express');
const router = express.Router();
const authJWTRoute = require('./auth.JWT.route');
const { validateToken, verifyAdmin, verify } = require('../middlewares/auth.middleware');
const { sessionMiddleware, cacheMiddleware } = require('../middlewares/index');
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
    statisticAdminRoute,
    voucherRoute,
    productAdminRoute,
    rateAdminRoute,
} = require('./admin');

router.use('/', siteRoute);
router.use('/collections', cacheMiddleware, collectionRoute);
router.use('/product', productRoute);
router.use('/cart', sessionMiddleware, cartRoute);
router.use('/bill', billRoute);
router.use('/voucher', voucherRoute);
router.use('/user', validateToken, verify, userRoute);

router.use('/authJWT', authJWTRoute);
router.use('/admin/rate', validateToken, verify, rateAdminRoute);
router.use('/admin/bills', validateToken, verifyAdmin, billAdminRoute);
router.use('/admin/products', validateToken, verifyAdmin, productAdminRoute);
router.use('/admin/users', validateToken, verifyAdmin, userAdminRoute);
router.use('/admin/dashboard', validateToken, verifyAdmin, statisticAdminRoute);

module.exports = router;
