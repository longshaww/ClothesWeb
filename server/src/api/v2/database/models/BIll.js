const mongoose = require('mongoose');
const { Schema } = mongoose;

const Bill = new mongoose.Schema(
    {
        userID: { type: Schema.Types.ObjectId, ref: 'User' },
        deliveryID: {
            type: Schema.Types.ObjectId,
            ref: 'DeliveryInfo',
        },
        voucherID: { type: Schema.Types.ObjectId, ref: 'Vouchers' },
        listProduct: [
            {
                idProduct: { type: Schema.Types.ObjectId, required: true },
                img: { type: String, required: true },
                name: { type: String, required: true },
                size: { type: String, required: true },
                price: { type: Number },
                qty: { type: Number, required: true },
                sum: { type: Number, required: true },
                isFeedBack: { type: Boolean, required: true, default: false },
            },
        ],
        qtyProduct: { type: Number, required: true },
        subTotal: { type: Number, required: true },
        total: { type: Number, required: true },
        shippingFee: { type: Number, required: true },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['COD', 'Online'],
        },
        status: {
            type: String,
            required: true,
            default: 'PENDING',
            enum: [
                'PENDING',
                'DELIVERY',
                'SUCCESSFUL_DELIVERY_CONFIRMATION',
                'FAILED_DELIVERY_CONFIRMATION',
                'CANCEL_BILL',
            ],
        },
    },
    {
        timestamps: true,
        collection: 'Bill',
        versionKey: false,
    }
);

module.exports = mongoose.model('Bill', Bill);
