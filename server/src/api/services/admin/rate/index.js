const Rate = require('../../../models/Rate');

module.exports = {
    deleteRate: async (rateID) => {
        return await Rate.findOneAndDelete(rateID);
    },
};
