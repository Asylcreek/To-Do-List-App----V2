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
    listName: {
        type: String,
        default: 'home',
        unique: true,
    },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;