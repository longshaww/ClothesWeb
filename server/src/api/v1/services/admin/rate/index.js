const {Rate} = require('../../../models/index');

module.exports = {
    deleteRate: async (rateID) => {
        return await Rate.findByIdAndDelete(rateID);
    },
    getAllRate: async () => {
        return await Rate.find().populate('productID').populate('userID');
    },
};
