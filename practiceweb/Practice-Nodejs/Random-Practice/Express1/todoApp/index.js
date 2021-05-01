const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const fsP = fs.promises;
const mongoClient = require('mongodb').MongoClient;
const routeFunctions = require('./public/routeFunctions');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.static('../public'));
//middleware that makes it so i can access the data from the form the user submitted
app.use(express.urlencoded({
    extended: true
}));
//loads homepage, (no lists made yet)
app.get('/', routeFunctions.noListHomeMongo)

//loads specific list
app.get('/list/:title', routeFunctions.displaySpecificListMongo)

// if they delete items
app.get('/list/:title/delete/:items', routeFunctions.deleteItemsMongo)

//if they want to delete the lists
app.get('/list/:title/delete/lists/:items', routeFunctions.deleteListsMongo)

//post element for the first list created
app.post('/list/first', routeFunctions.createFirstListMongo)

//user entered new item
app.post('/list/:title', routeFunctions.addNewItemMongo)

//user created a new list 
app.post('/newList', routeFunctions.createNewListMongo)


app.listen(8000, () => {
    console.log('listening on port 8000');
})