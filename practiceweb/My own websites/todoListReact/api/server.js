const express = require('express');
const app = express();
const path = require('path');
const mongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('express-flash');
const bcrypt = require('bcrypt');

const port =  process.env.PORT || 2000;

if(false){app.use(express.static(path.join(__dirname, "../my-app/src")));}
app.use(express.static(path.join(__dirname, "build")));

//so we can read data from the body of forms
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    //res.sendFile(path.resolve(__dirname, "../my-app/src", "index.html"));
});
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.get('/api', (req, res) => {
    console.log("on the api page");
    res.send('shit');
})

app.listen(port, () => {console.log(`listening on port: ${port}`)})