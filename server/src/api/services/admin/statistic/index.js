const BillWeb = require('../../../models/BillWeb');
const moment = require('moment');
module.exports = {
    filterStatistic: async (query) => {
        try {
            const { billState, paymentMethod, startDate, endDate } = query;
            let products = 0;
            const listUser = [];
            const startDateFormat = new Date(moment(startDate).format('YYYY-MM-DD'));
            const endDateFormat = new Date(moment(endDate).format('YYYY-MM-DD'));
            const bills = await BillWeb.find({
                status: billState,
                paymentMethod,
                createdAt: {
                    $gte: startDateFormat,
                    $lt: endDateFormat,
                },
            });
            bills.forEach((bill) => {
                products += bill.listProduct.length;
                if (!listUser.includes(bill.userID.toString())) {
                    listUser.push(bill.userID.toString());
                }
            });
            return {
                billCount: bills.length,
                productCount: products,
                userCount: listUser.length,
                bills,
            };
        } catch (err) {
            throw new Error(err.message);
        }
    },
};
