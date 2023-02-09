const limiter = require('./core/rateLimit');

function proxy(app, versions) {
    return (req, res, next) => {
        const version = req.headers['accept-version'] || 'v1';
        const handler = versions[version];
        if (!handler) {
            return res.status(400).json({ error: 'Invalid API version specified' });
        }
        app.use('/api', limiter, handler);
        next();
    };
}

module.exports = proxy;
