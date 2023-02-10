const mongoose = require('mongoose');
const Logger = require('../logger');
module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'HighClub',
        });
        Logger.getInstance().logger.info('Successfully connected to database');
    } catch (err) {
        Logger.getInstance().logger.error(`MongoDB connection failed with error: ${e}`);
    }
};
