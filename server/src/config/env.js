require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    STRIPE_KEY: process.env.STRIPE_KEY,
    SENTRY_URL: process.env.SENTRY_URL,
    signed_cookie : process.env.signed_cookie,
    API_HOST : process.env.API_HOST,
    URL_FRONTEND : process.env.URL_FRONTEND,
    AUTH_EMAIL : process.env.AUTH_EMAIL,
    AUTH_PASSWORD : process.env.AUTH_PASSWORD
};
