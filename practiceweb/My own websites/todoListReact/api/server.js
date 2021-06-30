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
const passportAuthentication = require("./public/authentication.js");

const port =  process.env.PORT || 2000;
const url = process.env.MONGODB_URI || "mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/todoListV2?retryWrites=true&w=majority";

app.use(express.static(path.join(__dirname, "build")));

//so we can read data from the body of forms
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

//user flash
app.use(flash());

app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : false
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser( async (id, done) => {
    try{
        const client = await mongoClient.connect(url);
        const db = client.db('todoListV2');
        const collection = await db.collection('users');
        const user = await collection.findOne({_id : new ObjectID(id)});
        done(null, user);
    }
    catch(err){
        console.log(err);
        done(err, false);
    }
});
//local strategy
//passportAuthentication.authentication();

//strategy
passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
    try{
        console.log('local strategy is running and the connect url is ' + url);
        const client = await mongoClient.connect(url);
        console.log('connected with the database');
        const collection = await client.db('todoListV2').collection('users');
        const user = await collection.findOne({email : email});
        console.log(`user ${JSON.stringify(user)}`);
        if(user == null){
            console.log('user is null');
            return done(null, false, {message: 'User Not Found'});
        }
        if(await !bcrypt.compare(password, user.password)){
            console.log('passwords did not match');
            return done(null, false, {message: "Incorrect Password"})
        }/*
        if(user.password != password){
           return done(null, false, {message : "Incorrect Password"});
        }*/
        else{
            console.log('success');
           return done(null, user);
        }
    }
    catch(err){
        console.log(`the Error has been found on the local strategy ${err}`);
        return done(null, false, {message: "Problem with the server"});
    }
    //return done(null,false);
}))



//     Paths     /////

    // GET //
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, "build", "index.html"));
            //res.sendFile(path.resolve(__dirname, "../my-app/src", "index.html"));
        });
        // for authentication
        app.get('/authenticate', (req, res, next) => {
            let result;
            console.log('authenticate ran');
            if(req.query.checkAuthenticated){
                console.log("checkAuthenticated");
                result = checkAuthenticated(req, res, next);
            }else{
                console.log('checkNotAuthenticated');
                result = checkNotAuthenticated(req, res, next);
            }
            res.send(result);
        })
        app.get('/*', (req, res) => {
            console.log('bullshit ran');
            res.sendFile(path.join(__dirname, "build", "index.html"));
        })




    // POST //
        app.post('/login', passport.authenticate('local', {
            failureRedirect : '/login',
            failureFlash: true
        }), (req, res) =>{
            res.redirect('/specificlistpage');
        })

app.listen(port, () => {console.log(`listening on port: ${port}`)});

//function that checks to see if the user is logged in and if not then redirects them to the login page
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        console.log('the user is authenticated');
        return true
    }
    else{
        console.log('the user is not authenticated');
        return false
    }
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect(routeFunctions.createListOrFirstList(req))
    }
    else{
        return next()
    }
}