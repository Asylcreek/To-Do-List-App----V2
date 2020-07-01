const Item = require('./itemModel');
const _ = require('lodash');

//Function that returns the current date
const getCurrentDate = () => {
    const today = new Date();

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };

    return today.toLocaleDateString('en-US', options);
};

exports.getAllItems = async(req, res) => {
    try {
        const date = getCurrentDate();

        //Get the listName from the request
        let listName = req.params.listName;

        // Check if listName exists
        if (!listName) listName = 'home';

        //Capitalize the first letter of listName
        listName = _.capitalize(listName);

        //Find the items for a particular list
        let items = await Item.find({ listName });

        //Check if the items are more than zero
        if (items.length === 0) {
            items = await Item.find({ placeholder: true });
        }

        res.render('list', { listName, date, items });
    } catch (err) {
        console.log(err);
    }
};

exports.createItem = async(req, res) => {
    try {
        //Get the item name and listName from the request
        const newItem = req.body.newItem;
        let listName = req.params.listName;

        //Check if listName exists
        if (!listName) listName = 'home';

        //Capitalize the first letter of listName
        listName = _.capitalize(listName);

        //Check if newItem exists
        if (newItem) {
            await Item.create({ name: newItem, listName });
        }

        //Select the correct redirect route
        if (listName === 'Home') {
            res.redirect('/');
        } else {
            res.redirect(`/${listName}`);
        }
    } catch (err) {
        console.log(err);
    }
};

exports.deleteItem = async(req, res) => {
    try {
        //Get the listName from the request
        const listName = req.params.listName;

        //Get the id of the item to delete
        const checkedItemId = req.body.checkbox;

        //Check if the item is not a placeholder
        const item = await Item.findById(checkedItemId);
        if (item.placeholder !== true) {
            await Item.findByIdAndDelete(checkedItemId);
        }

        //Select the correct route
        if (listName === 'Home') {
            res.redirect('/');
        } else {
            res.redirect(`/${listName}`);
        }
    } catch (err) {
        console.log(err);
    }
};