//Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');

const itemController = require('./itemController');

//Initialize express
const app = express();

//Set the templating engine
app.set('view engine', 'ejs');

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//GET: Home route handler
app.get('/', itemController.getAllItems);

//POST: Home route handler
app.post('/', itemController.createItem);

//POST: Delete item route handler
app.post('/delete/:listName', itemController.deleteItem);

//GET: Custom list route handler
app.get('/:listName', itemController.getAllItems);

//POST: Custom list route handler
app.post('/:listName', itemController.createItem);

// itemController.updateItem('5efa0a33de8287310428a8df');

module.exports = app;