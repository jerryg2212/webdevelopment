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
//local strategy
//passportAuthentication.authentication();

//strategy
/*
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
    /*    else{
            console.log('success');
           return done(null, user);
        }
    }
    catch(err){
        console.log(`the Error has been found on the local strategy ${err}`);
        return done(null, false, {message: "Problem with the server"});
    }
    //return done(null,false);
}))*/

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


app.get('/authenticate', (req, res, next) => {
    console.log(req.query.checkAuthenticated);
    if(req.query.checkAuthenticated === 'true'){
        console.log('is authenticated');
        if(checkAuthenticated(req, res, next)){
            console.log('should continue');
            res.json({authorized: true})
        }else{
            console.log('should redirect to /login');
            res.json({authorized: false, callback_url : req.query.callback_url})
        }
    }else{
        console.log('is not authenticated');
        if(checkNotAuthenticated(req, res, next)){
            res.json({authorized: false, callback_url : req.query.callback_url})
        }else{
            console.log('should continue');
            res.json({authorized: true});

        }
    }
})
app.get('/api/list/:listTitle', async (req, res) => {
    try{
        console.log('sending data from the database to client');
        let listTitle = req.params.listTitle;
        const client = await mongoClient.connect(url);
        const collection = await client.db('todoListV2').collection('users');
        const user = await collection.findOne({_id : new ObjectId(req.user._id)})
        let currentList = user.lists[0];
        for(list of user.lists){
            if(listTitle == list.title){currentList = list}
        }

        res.json({
            listTitle: listTitle,
            items: currentList.items,
            lists: user.listsTitles
        })
    }catch(err){
        res.json({error: 'could not fetch data from the server'})
    }

})

// returns json data of the route that should be the call back url
app.get('/api/get-callback-url', (req, res) => {
    let callback_url = '/'
    if(checkAuthenticated(req, res)){
        callback_url = createListOrFirstList(req);
    }else{
        callback_url = '/login';
    }
    console.log(`this is the callback url ${callback_url}`);
    res.json(callback_url)
})


/////   POST     /////
app.post('/login', passport.authenticate('local', {
    failureRedirect : '/login',
    failureFlash : true
}), (req, res )=> {
    res.redirect(createListOrFirstList(req));
})

// /list/:listTitle
app.post('/list/:listTitle', routeFunctions.addNewItemPost/*async (req, res) => {
    let currentListTitle = req.params.listTitle;
    let newItem = req.body.newItem;
    console.log(newItem);
    let client = await mongoClient.connect(url);
    let collection = await client.db('todoListV2').collection('users');

    //updates the new item
    let currentList = findList(currentListTitle, req.user.lists);
    currentList.push(newItem);
    collection.updateOne({_id : new ObjectId(req.user._id)}, {$set: {"lists" : req.user.lists}})

    res.redirect(`/list/${currentListTitle}`);

}*/)




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
            return `/list/${req.user.lists[0].title}`
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