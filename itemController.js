const Item = require('./itemModel');

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

exports.createItem = async(req, res) => {
    try {
        // const newItem = await Item.create({ name });
        const newItem = req.body.newItem;

        if (newItem) {
            if (req.body.list === 'Work List') {
                workItems.push(newItem);

                res.redirect('/work');
            } else {
                // items.push(item);
                await Item.create({ name: newItem });

                res.redirect('/');
            }
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }
    // next();
};

exports.getAllItems = async(req, res) => {
    try {
        let items = await Item.find();
        const date = getCurrentDate();

        if (items.length <= 3) {
            items = await Item.find({ placeholder: true });
        } else {
            items = await Item.find({ placeholder: false });
        }

        res.render('list', { listTitle: date, items });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteAllItems = async() => {
    try {
        await Item.deleteMany();
        console.log('Success');
    } catch (err) {
        console.log(err);
    }
};