const mongoose = require('mongoose');

const Type = new mongoose.Schema({
    typeName: String,
    status: Boolean
});

module.exports = mongoose.model('types', Type);