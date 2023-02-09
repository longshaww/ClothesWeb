const mongoose = require('mongoose');
const { Schema } = mongoose;

const Types = new mongoose.Schema(
    {
        typeName: {
            type: Schema.Types.String,
            enum: ['Tee', 'Jacket', 'Sweater', 'Pant', 'Short', 'Hoodie', 'Varsity'],
        },
        status: { type: Schema.Types.Boolean, required: true },
    },
    {
        timestamps: true,
        collection: 'Types',
        versionKey: false,
    }
);

module.exports = mongoose.model('Types', Types);
