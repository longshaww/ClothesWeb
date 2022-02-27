const mongoose = require('mongoose');

const bill = new mongoose.Schema({
    userID: String,
    displayName: Object,
    listProduct: Array,
    address: String,
    paymentMethod: String,
    resquest: String,
    status: String

}, {
    timestamps: true,
  });

module.exports = mongoose.model('bills', bill);