const client = require('../../../config/db/redis');

module.exports = {
    cacheMiddleware: async (req, res, next) => {
        const key = req.originalUrl;
        let data = await client.get(key);
        if (data !== null) {
            res.send(JSON.parse(data));
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                res.sendResponse(body);
                client.set(key, body, {
                    EX: 60,
                    NX: true,
                });
            };
            next();
        }
    },
};
