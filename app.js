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
// ;

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
app.get('/', itemController.getAllItems);

//GET: Work route handler
app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Work List', items: workItems });
});

//POST: Home route handler
app.post('/', itemController.createItem);

module.exports = app;