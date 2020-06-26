//Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

const itemController = require('./itemController');

//Initialize express
const app = express();

//Set the templating engine
app.set('view engine', 'ejs');

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// itemController.createItem('Cook food');
itemController.getAllItems();

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

//Function to add new items
const addNewItems = (req, res) => {
    const item = req.body.newItem;

    if (req.body.list === 'Work List') {
        workItems.push(item);

        res.redirect('/work');
    } else {
        items.push(item);

        res.redirect('/');
    }
};

//GET: Home route handler
app.get('/', (req, res) => {
    const date = getCurrentDate();
    res.render('list', { listTitle: date, items });
});

//GET: Work route handler
app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Work List', items: workItems });
});

//POST: Home route handler
app.post('/', addNewItems);

module.exports = app;