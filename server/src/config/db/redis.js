const { REDIS_URL, REDIS_KEY } = require('../env');
const redis = require('redis');
console.log(REDIS_KEY);
const client = redis.createClient({
    url: REDIS_URL,
    password: REDIS_KEY,
});

client.on('error', (err) => {
    console.log('REDIS ERROR - ' + err);
});

client.on('connect', (stream) => {
    console.log('Redis CONNECTED...');
});

client.connect();

module.exports = client;
