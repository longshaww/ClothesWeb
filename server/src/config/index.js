const expressLoad = require('./express');
const mongooseLoad = require('./db/mongo');
module.exports = async (app) => {
    await mongooseLoad();
    expressLoad(app);
};
