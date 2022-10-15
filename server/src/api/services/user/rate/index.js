const UserWeb = require('../../../models/UserWeb');
const Product = require('../../../models/Product');
const Rate = require('../../../models/Rate');
const BillWeb = require('../../../models/BillWeb');

module.exports = {
    rateProduct: async (userID, productID, data) => {
        const user = await UserWeb.findById(userID);
        const product = await Product.findById(productID);
        const { content, rate } = data;
        const bill = await BillWeb.findOne({
            userID,
            'listProduct.id': productID,
        });
        if (!user) return `User with ID ${userID} not found`;
        if (!product) return `Product with ID ${productID} not found`;
        if (!rate) return `All field is required`;
        if (bill.status !== 'SUCCESSFUL_DELIVERY_CONFIRMATION')
            return `You don't have permission to rate this product`;

        const newRate = await Rate.create({
            content,
            rate,
            userID: user.id,
            productID: product.id,
        });
        return newRate;
    },
};
