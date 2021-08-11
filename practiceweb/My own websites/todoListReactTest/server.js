const express = require('express');
const app = express();
const path = require('path');
const mongoClient = require("mongodb").MongoClient;
const {ObjectId} = require("mongodb");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const routeFunctions = require('./my-app/src/pages/routeFunctions.js');
const passportAuthentication = require("./my-app/public/authentication.js");

const port =  process.env.PORT || 2000;
const url = process.env.MONGODB_URI || "mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/todoListV2?retryWrites=true&w=majority";

app.use(express.static(path.join(__dirname, "build")));

//so we can read data from the body of forms
app.use(express.urlencoded({extended: false}));

passportAuthentication.loadAuthentication(passport);
app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

//user flash
app.use(flash());


passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser( async (id, done) => {
    try{
        const client = await mongoClient.connect(url);
        const db = client.db('todoListV2');
        const collection = await db.collection('users');
        const user = await collection.findOne({_id : new ObjectId(id)});
        done(null, user);
    }
    catch(err){
        console.log(err);
        done(err, false);
    }
});


//////  ROUTES  /////
/*app.get('/login', (req, res) => {
    console.log('hit');
    res.send('sdlkfjsd;klfjks');
})*/
app.get('/', (req, res) => {
    console.log('homepage');
    if(checkAuthenticated(req, res)){
        res.redirect(createListOrFirstList(req));
    }else{
        res.redirect('/login');
    }
})


app.get('/authenticate', routeFunctions.authenticate)

// returns the list items of the specified list
app.get('/api/:listTitle/items', routeFunctions.getListItems)

// returns the list of all the users lists
app.get('/api/lists', routeFunctions.getListOfLists)

// returns the current list title
app.get('/api/:listTitle/title', routeFunctions.getListTitle)

// returns json data of the route that should be the call back url
app.get('/api/get-callback-url', routeFunctions.getCallbackUrl)

// logs user out
app.get('/delete', routeFunctions.logOut);


/////   POST     /////
app.post('/login', passport.authenticate('local', {
    failureRedirect : '/login',
    failureFlash : true
}), (req, res )=> {
    res.redirect(createListOrFirstList(req));
})
app.post('/register', routeFunctions.register);

// /list/:listTitle
app.post('/list/:listTitle', routeFunctions.addNewItemPost)

// creats a new list
app.post('/createlist', routeFunctions.createList);




app.listen(port, () => {console.log(`listening on port ${port}`)});


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
        return true
    }
    else{
        return false 
    }
}

    //function that returns the route to either the create first list page or the users first list in the database
    // parameters : req object
    //returns : route 
    function createListOrFirstList (req) {
        console.log(`createListOrFirstList ran and the user is ${req.user}`);
        if(!req.user.lists || req.user.lists.length === 0){
            return '/createFirstList'
        }
        if(req.user.lists.length > 0){
            return `/list/${req.user.lists[0].title}?list=${req.user.lists[0].title}`
        }
        return `/createFirstList`
    }

        // function that finds and returns the list that matches the title
        // paramers : (title of the list we want to find, array of lists objects)
        // returns : an array of items (a list)
        function findList(title, lists){
            for(list of lists){
                if(list.title == title){return list.items}
            }
            return lists[0].items
        }