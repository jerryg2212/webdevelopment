const express = require('express');
const app = express();
const passport = require('passport');
const path = require('path');
const CustomStrategy = require('passport-custom').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = "mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/passportPractice?retryWrites=true&w=majority";
//let users = [];
//session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

//setting up passport
app.use(passport.initialize());
app.use(passport.session());

//making it so we can read requests
app.use(express.urlencoded({extended : false}));


//setting up the views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//making strategy
passport.use(new LocalStrategy( (username, password, done) => {
    mongoClient.connect(url, (err, client) => {
        let db = client.db('passportPractice');
        const collection = db.collection('users');
        collection.findOne({"username": username}, (err, result) => {
            console.log(result);
            if(err) {
                console.log('error');
                return done(err);
            }
            if(!result){
                console.log('no rresult');
                return done(null, false);
            }
            if(result.password != password){
                console.log('password does not match'); 
                return done(null, false);
            }
            console.log('penis');
            return done(null, result);
        })
    })
    /*currentUser = users.find(user => user.username == username);
    console.log(`shit head ${currentUser.password}`);
    if(!currentUser){
        return done(null, false, {message: "incorrect username"});
    }
    if(currentUser.password != password){
        return done(null, false, {message: "incorrect password"})
    }
    return done(null, currentUser);*/
    
}));

passport.serializeUser((user, done) => { 
    console.log(user);
    done(null, user._id)
})
passport.deserializeUser( (id, done) => {
    mongoClient.connect(url, (err, client) => {
        const db = client.db('passportPractice');
        const collection = db.collection('users');
        collection.findOne({_id: new ObjectId(id)})
        .then(result => {done(null, result)});
    })
    /*let john = new Promise((resolve, reject) => {
        resolve(findUserById(id));
    });
    john.then(an => {console.log(an)});*/
    /*
    let userPromise =  findUserById(id);
    console.log(userPromise);
    userPromise.then(user => {
        console.log(`deserialize user ran this is the user ${user} this is the id ${id}`);
        done(null, user)
    })*/
})

app.get('/', checkAuthenticated, (req, res) => {
    console.log(req.user);
    res.render('homepage', {user: req.user.username})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
})

app.post('/register', checkNotAuthenticated, (req, res) => {
    mongoClient.connect(url, async (err, client) => {
        const db = client.db('passportPractice');
        const collection = db.collection('users');
        await collection.insertOne({username: req.body.username, password: req.body.password});
        res.redirect('/login');
        client.close();
    })
   // users.push({id: Date.now().toString(), username: req.body.username, password: req.body.password})
   // console.log(users);
   // res.redirect('/login')
})

app.get('/delete', (req, res) => {
    req.logOut();
    res.redirect('/login');
})


app.listen(8000, () => {
    console.log('listening on port 8000');
})

//middle ware that makes sure a user is logged in
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log('not authorized');
    res.redirect('/login')
}

//middleware that makes sure the user is not logged in
function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return next();
}

//find user based on id
function findUserById(id){
    mongoClient.connect(url, (err, client) => {
        const db = client.db('passportPractice');
        const collection = db.collection('users');
        console.log(`this is the id to be matched ${id}`);
       return collection.findOne({_id: new ObjectId(id)})/*, (err, result) => {
            if(err){
                console.log('there was an error finding the id');
                return err;
            }
            console.log(`this is the user returned ${result._id}`);
            client.close();
            return result;*/
    })
}