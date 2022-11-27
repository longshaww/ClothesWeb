const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'HighClub',
        });
        console.log('Successfully connected to database ');
    } catch (err) {
        console.log(err);
    }
};
