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
    dateCreated: Date,
});

itemSchema.pre('save', function(next) {
    this.dateCreated = Date.now();
    next();
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;