const Item = require('./itemModel');

exports.createItem = async(name) => {
    try {
        const newItem = await Item.create({ name });

        console.log(newItem);
    } catch (err) {
        console.log(err);
    }
    // next();
};

exports.getAllItems = async() => {
    try {
        const items = await Item.find();

        console.log(items);
    } catch (err) {
        console.log(err);
    }
};