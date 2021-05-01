const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const connectEnsureLogin = require('connect-ensure-login');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
})

//mongo db url
    const mongourl = 'mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/passportPractice?retryWrites=true&w=majority';


//use static files
app.use(express.static(__dirname));


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended : true}));
app.use(expressSession);

//passport setup
    app.use(passport.initialize());
    app.use(passport.session());

//mongoose setup
    mongoose.connect('mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/passportPractice?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true});

    const Schema = mongoose.Schema;
    const UserDetail = new Schema({
        username: String,
        password: String
    });

    UserDetail.plugin(passportLocalMongoose);
    const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

//passport local authentication
    passport.use(UserDetails.createStrategy());

    passport.serializeUser(UserDetails.serializeUser());
    passport.deserializeUser(UserDetails.deserializeUser());


app.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        if (err) {
            return next(err);
        }
        
        if (!user) {
            return res.redirect('/login?info=' + info);
        }

        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            return res.redirect('/');
        });
    })(req, res, next);
});

app.get('/login',
    (req, res) => res.sendFile('html/login.html',
    {root: __dirname })
);

app.get('/', 
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('html/private.html', {root: __dirname})
    );

app.get('/user', 
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.send({user: req.user})
    );

    

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));

//register some users
   /* UserDetails.register({username: 'pual', active: false}, 'paul');
    UserDetails.register({username: 'jay', active: false}, 'jay');
    UserDetails.register({username: 'roy', active: false}, 'roy');*/