const express = require('express');
const path = require('path');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const routeFunctions = require('./public/routeFunctions');
const flash = require('express-flash');
const bcrypt = require('bcrypt');

const url = "mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/todoListV2?retryWrites=true&w=majority";

//setting up the view engine (pug)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

//so we can use static files
app.use(express.static('public'))
app.use(express.static('../public'));

//so we can read data from the body of forms
app.use(express.urlencoded({extended: false}));

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
        const user = await collection.findOne({_id : new ObjectID(id)});
        done(null, user);
    }
    catch(err){
        console.log(err);
        done(err, false);
    }


})

//strategy
passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
    try{
        const client = await mongoClient.connect(url);
        const collection = await client.db('todoListV2').collection('users');
        const user = await collection.findOne({email : email});
        if(user == null){
            return done(null, false, {message: 'User Not Found'});
        }
        if(await !bcrypt.compare(password, user.password)){
            return done(null, false, {message: "Incorrect Password"})
        }
        /*if(user.password != password){
           return done(null, false, {message : "Incorrect Password"});
        }*/
        else{
           return done(null, user);
        }
    }
    catch(err){
        console.log(`the Error has been found on the local strategy ${err}`);
        return done(null, false, {message: "Problem with the server"});
    }
    //return done(null,false);
}))


//// ROUTES /////\\\\\\

    //// GET /////\\\\\\\\\

        //temporary landing page
        app.get('/', checkAuthenticated, routeFunctions.landingPage)

        //login page
        app.get('/login', checkNotAuthenticated, routeFunctions.loginGet)

        //register page
        app.get('/register', checkNotAuthenticated, routeFunctions.registerGet)

        //user has no prior lists created thus needs to create a new list
        app.get('/createFirstList', checkAuthenticated, routeFunctions.createFirstListGet)

        //specific List
        app.get('/list/:listTitle', checkAuthenticated, routeFunctions.specificList)

        //logs the user out (in the future make this route a delete)
        app.get('/delete', checkAuthenticated, routeFunctions.logOutGet)

        // if they delete items
        app.get('/list/:title/delete/:items', routeFunctions.deleteItems)

        //if they want to delete the lists
        app.get('/list/:title/delete/lists/:items', routeFunctions.deleteLists)


    //// POST /////\\\\\\\\

        //loging page
        app.post('/login', passport.authenticate('local', 
        {
            failureRedirect : '/login',
            failureFlash: true
        }),
         routeFunctions.loginPost)

        //register page
        app.post('/register', routeFunctions.registerPost)

        //creat first list 
        app.post('/createList', routeFunctions.createList)

        //adds a new item to the current list
        app.post('/list/:title', routeFunctions.addNewItem)




app.listen(8000, () => {
    console.log('listening on port 8000');
})

//function that checks to see if the user is logged in and if not then redirects them to the login page
    function checkAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        else{
            return res.redirect('/login')
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
