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
            userID: userID,
            listProduct: { $elemMatch: { idProduct: productID, isFeedBack: false } },
            status: 'SUCCESSFUL_DELIVERY_CONFIRMATION',
        });
        if (!bill) throw new Error(`You have to buy this product before you can rate it`);
        if (!user) throw new Error(`User with ID ${userID} not found`);
        if (!product) throw new Error(`Product with ID ${productID} not found`);
        if (!rate) throw new Error(`All field is required`);
        const productFeedBack = await bill.listProduct.find((item) =>
            item.idProduct.equals(productID)
        );
        if (!productFeedBack)
            throw new Error('You have to buy this product before you can rate it');
        if (productFeedBack.isFeedBack === true) throw new Error('You have rated this product');

        productFeedBack.set({
            isFeedBack: true,
        });
        bill.save();
        const newRate = await Rate.create({
            content,
            rate,
            userID: user.id,
            productID: product.id,
        });
        if (!newRate) throw new Error('Something went wrong while rating');
        return newRate;
    },

    productReview: async (productID) => {
        const listReview = await Rate.find({ productID: productID }).populate('userID');
        if (!listReview) throw new Error(`Product invalid`);
        return listReview;
    },
};
