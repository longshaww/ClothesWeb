const mongoose = require('mongoose');

const customer = new mongoose.Schema({
    nameCustomer: Object,
    dateOfBirth: String,
    sex: String,
    identityCardNumber: String,
    address: String,
    phoneNumber: String,
    email: String,
    listProduct: Array,
    loginInformation: Object,
    avatar: String
}, {
    timestamps: true,
  });

module.exports = mongoose.model('customers', customer);