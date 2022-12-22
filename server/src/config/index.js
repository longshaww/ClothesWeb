const expressLoad = require('./express');
const mongooseLoad = require('./database');
const ServerGlobal = require('./logger');
module.exports = async (app) => {
    await mongooseLoad();
    expressLoad(app);
};
