const Rate = require('../../../models/Rate');
const Product = require('../../../models/Product');

module.exports = {
    deleteRate: async (rateID) => {
        return await Rate.findByIdAndDelete(rateID);
    },
    getAllRate: async () => {
        return await Rate.find().populate('productID').populate('userID');
    },
};
