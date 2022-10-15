const authCookieMiddleware = require('./auth.cookie.middleware');
const authMiddleware = require('./auth.middleware');
const sessionMiddleware = require('./session.middleware');

module.exports = {
    authCookieMiddleware,
    authMiddleware,
    sessionMiddleware,
};
