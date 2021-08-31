const mongoClient = require("mongodb").MongoClient;
const express = require('express');
const app = express();
const {ObjectId} = require("mongodb");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');
const url = process.env.MONGODB_URI || "mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/todoListV2?retryWrites=true&w=majority";
const serverUniversalFunctions = require('./serverUniversalFunctions');

//so we can read data from the body of forms
//app.use(express.urlencoded({extended: false}));

// for parsing application/json
//app.use(bodyParser.json()); 
// for parsing application/xwww-
//app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
/*app.use(upload.array()); 
app.use(express.static('public'));*/

///// GET METHODS     //////

    // authentication function that returns true or false 
    // Route: /authenticate
        exports.authenticate = (req, res, next) => {
            // user should be logged in
            if(req.query.checkAuthenticated === 'true'){
                //user is logged in so continue to correct page
                if(checkAuthenticated(req, res, next)){
                    res.json({authorized: true})
                // user is not loggen in so redirect to the login page
                }else{
                    res.json({authorized: false, callback_url : '/login'})
                }
            // user should not be logged in
            }else{
                // user is logged in so redirect to the page the user was on before
                if(checkNotAuthenticated(req, res, next)){
                    res.json({authorized: false, callback_url : req.query.callback_url})
                // user is not logged in which is expected so continue to user desired page
                }else{
                    res.json({authorized: true});
        
                }
            }
        }

    // returns json data of the route that should be the call back url
    // Route: /api/get-callback-url
        exports.getCallbackUrl = (req, res) => {
           // console.log(`getcallbackurl called and the list is ${req.query.list}`);
            let callback_url = '/'
            if(checkAuthenticated(req, res)){
                callback_url = createListOrFirstList(req);
                callback_url += `?list=${req.user.lists[0].title}`;
            }else{
                callback_url = '/login';
            }
            console.log(`this is the callback url ${callback_url}`);
            res.json(callback_url)
        }

        
    // returns information on the listtitle in the url parameters
    // Route /api/:listTitle/items
        exports.getListItems = async (req, res) => {
            try{
                console.log('sending data from the database to client');
                let listTitle = req.params.listTitle;
                const collection = await getMongoCollection(url, 'todoListV2', 'users');
                const user = await collection.findOne({_id : new ObjectId(req.user._id)})
                let currentList = user.lists[0];
                for(list of user.lists){
                    if(listTitle == list.title){currentList = list}
                }
                res.json({
                    items: currentList.items,
                })
            }catch(err){
                res.json({error: 'could not fetch data from the server'})
            }
        }
        // returns the list of all the users lists
        // Route: /api/lists
        exports.getListOfLists = async (req, res) => {
            console.log('getListOfLists called');
            let collection = await getMongoCollection(url, 'todoListV2', 'users');
            let user = await collection.findOne({_id : new ObjectId(req.user._id)});
            res.json({lists: user.listsTitles});
        }

        // returns the list title of the current list
        // Route: /api/:listTitle/title
        exports.getListTitle = (req, res) => {
            res.json({listTitle: req.params.listTitle});
        }

        // logs the user out of session
        // Route: /delete
        exports.logOut = (req, res) => {
            req.logOut();
            res.json({msg: "logged out"});
        }





///// POST METHODS    ///////

    // Route: /register
        exports.register = async (req, res) => {
            console.log('post register ran');
            console.log(`this is the body ${JSON.stringify(req.body)}`);

            const body = req.body;
            console.log(`this is the email: ${body.email} and this is the password ${body.password}`);
            let newEmail = req.body.email;
            let newPassword = await bcrypt.hash(req.body.password, 10);
            const collection = await getMongoCollection(url, 'todoListV2', 'users');
            // checking to see if there is already a user with that email
                const oldUserResult = await collection.findOne({email: newEmail});
                // there is already a user with that email so send error to user
                    if(oldUserResult != null){
                        console.log('already registered');
                        res.redirect('/login?errorMSG=User is already registered');
                    }
                // password is not valid
                    if(!serverUniversalFunctions.registrationPasswordValidation(req.body.password)){
                        console.log('password not valid');
                        res.redirect('/register?errorMSG=Password must be at least 8 characters long');
                    }
                //saving the new user data
                let newUserInformation = await collection.insertOne({email: newEmail, password: newPassword, lists: [], listsTitles: []});
                console.log(`The new users email is ${JSON.stringify(newUserInformation)} and password: ${newUserInformation.result}`);
                res.send({error: null,
                            callback_url: '/login'});
        }

    // Route: /list/:listTitle
        exports.addNewItemPost = async (req, res) => {
            let currentListTitle = req.params.listTitle;
            let newItem = req.body.newItem;
            console.log(newItem);
            let client = await mongoClient.connect(url);
            let collection = await client.db('todoListV2').collection('users');
        
            //updates the new item
            let currentList = findList(currentListTitle, req.user.lists);
            currentList.push(newItem);
            collection.updateOne({_id : new ObjectId(req.user._id)}, {$set: {"lists" : req.user.lists}})
        
            res.redirect(`/list/${currentListTitle}?list=${currentListTitle}`);
        }

    // Route: /createlist
        exports.createList = async (req, res) => {
            console.log('createList is called');
            try{
              // gets collection
                let collection = await getMongoCollection(url, 'todoListV2', 'users');
              // new list title
                let newListTitle = req.body.listTitle;
              // finds the user
                  let user = await collection.findOne({_id : new ObjectId(req.user._id)});

                  console.log(Object.keys(user));
              // saves the users list of lists and adds the new one
                  let userListsTitles = user.listsTitles;
                  userListsTitles.push(newListTitle);
              // updates the users lists object with the new list
                  let userLists = req.user.lists;
                  userLists.push({title: newListTitle, items: []});
  
              // updates the users information in the mongodb database
              let result = await collection.updateOne({_id: new ObjectId(req.user._id)}, {$set: {"lists" : userLists,
                                                                                                      "listsTitles" : userListsTitles}});
              res.redirect(`/list/${newListTitle}?list=${newListTitle}`);
            }catch(err){
                res.redirect(createListOrFirstList(req));
            }

        }

        




///// FUNCTIONS     /////


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

    // function that returns a mongodb collection
        async function getMongoCollection(mongoURL, database, collection){
            try{
                let client = await mongoClient.connect(mongoURL);
                return await client.db(database).collection(collection);
            }catch(err){
                return undefined;
            }
        }