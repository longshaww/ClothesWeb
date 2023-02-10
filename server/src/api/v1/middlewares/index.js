const authCookieMiddleware = require('./auth.cookie.middleware');
const authMiddleware = require('./auth.middleware');
const sessionMiddleware = require('./session.middleware');
const {cacheMiddleware} = require('./cache.middleware');
module.exports = {
    authCookieMiddleware,
    authMiddleware,
    sessionMiddleware,
    cacheMiddleware
};
