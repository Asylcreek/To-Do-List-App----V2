const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    placeholder: {
        type: Boolean,
        default: false,
    },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;