const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    fullNameCustomer: Object,
    dateOfBirth: String,
    sex: String,
    identityCardNumber: String,
    address: String,
    phoneNumber: String,
    email: String,
    loginInformation: Object,
    avatar: String
}, {
    timestamps: true,
  });

module.exports = mongoose.model('admins', admin);