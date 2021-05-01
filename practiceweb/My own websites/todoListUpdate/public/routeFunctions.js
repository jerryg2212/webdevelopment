const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const url = "mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/todoListV2?retryWrites=true&w=majority";



//// GET ////\\\\\\\\\\

    // route = "/"
    exports.landingPage = (req, res) => {
        res.redirect(createListOrFirstList(req));
    }

    // route =  "/login"
    //loads the login page
    exports.loginGet = (req, res) => {
        res.render('loginPage');
    }

    // route = "/register"
    //loads the register page
    exports.registerGet = (req, res) => {
        res.render('registerPage');
    }

    // route = "createList"
    // loads the create first list page
    exports.createFirstListGet = (req, res) => {
        res.render('createFirstList', {username: req.user.email});
    }

    // route = "/list/:listTitle"
    // loads a specific list based on the url route parameter
    exports.specificList = async (req, res) => {
        let listTitle = req.params.listTitle;
        const client = await mongoClient.connect(url);
        const collection = await client.db('todoListV2').collection('users');
        const user = await collection.findOne({_id : new ObjectID(req.user._id)})
        let currentList = user.lists[0];
        for(list of user.lists){
            if(listTitle == list.title){currentList = list}
        }
        res.render('specificListPage', {listTitle: listTitle, items: currentList.items, lists: user.listsTitles});
    }

    // route = "/delete"
    // logs the user out
    exports.logOutGet = (req, res) => {
        req.logOut();
        res.redirect('/login')
    }

    // route = "/list/:title/delete/lists/:items"
    // deletes the lists the user specifies
    exports.deleteLists = async (req, res) => {
        let deletableLists = req.params.items;
        deletableLists = deletableLists.split(" ").reverse();

        const client = await mongoClient.connect(url);
        const collection = await client.db('todoListV2').collection('users');
        // get the users lists of lists and the users lists
            let userListsTitles = req.user.listsTitles
            let userLists = req.user.lists;
        //updating them
            for(list of deletableLists){
                userListsTitles.splice(list, 1);
                userLists.splice(list, 1);
            }
        //updating the current users information
        const result = await collection.updateOne({_id : new ObjectID(req.user._id)}, {$set : {"lists" : userLists, "listsTitles" : userListsTitles}});

        //redirecting to proper route
        res.redirect(createListOrFirstList(req));
    }

    exports.deleteItems = async (req, res) => {
        let currentListTitle = req.params.title;
        let deleteItems = req.params.items.split(' ').reverse();
        const client = await mongoClient.connect(url);
        const collection = await client.db('todoListV2').collection('users');

        //finding the list that we need to delete the items from
        let currentList = req.user.lists[0];
        for(list of req.user.lists){
            if(currentListTitle == list.title){currentList = list}
        }
        
        //deleting the items from the list
        for(item of deleteItems){
            currentList.items.splice(item, 1);
        }

        //updating the information to the database
        collection.updateOne({_id : new ObjectID(req.user._id)}, {$set : {"lists" : req.user.lists}});

        res.redirect(`/list/${currentListTitle}`);
    }

//// POST ////\\\\\\\\\
    // route = "/login"
    // redirects the route based on the inputed information by the user
    exports.loginPost = (req, res) => {
        res.redirect(createListOrFirstList(req));
    }

    // route = "/register"
    // saves the new users information to the database and redirects to the login page
    exports.registerPost = async (req, res) => {
        let newEmail = req.body.email;
        let newPassword = await bcrypt.hash(req.body.password, 10);
        const client = await mongoClient.connect(url);
        const collection = await client.db('todoListV2').collection('users');
        //checking to see if there is already a user with that email 
        const oldUserResult = await collection.findOne({email: newEmail});
        //there is already a user with that email so send error to user
            if(oldUserResult != null){res.redirect('/register');}
        let newUserInformation = await collection.insertOne({email: newEmail, password: newPassword, lists: [], listsTitles: []});
        console.log(`The new users email is ${newUserInformation} and password: ${newUserInformation.result}`);
        client.close();
        res.redirect('/login');
    }

    // route = "/createFirstList"
    // saves the user first list to the database and redirects the user to the list page with their first list 
    exports.createList = async (req, res) => {
        let listTitle = req.body.listTitle.toLowerCase();
        try{
            const client = await mongoClient.connect(url);
            const collection = await client.db('todoListV2').collection('users');
            // array that holds all the lists
                let userLists = req.user.lists;
                userLists.push({title: listTitle, items: []})
            // array that holds all the titles of the lists
                let userListsTitles = req.user.listsTitles;
                userListsTitles.push(listTitle);
            let result = await collection.updateOne({_id: new ObjectID(req.user._id)}, {$set : {"lists": userLists,
                                                                                                "listsTitles": userListsTitles}})
            /*const user = await findUserById(req.user._id);
            user.lists.push({title: listTitle, items: []});*/
            res.redirect(`/list/${listTitle}`);
        }
        catch(err){
            console.log(err);
            res.render('createFirstList')
        }
    }

    // route = "/list/:title"
    //adds a new item to the current list
    exports.addNewItem = async (req, res) => {
        let currentListTitle = req.params.title;
        let newItem = req.body.newItem;

        const client = await mongoClient.connect(url);
        const collection = await client.db('todoListV2').collection('users');
        
        //updates the new item
        let currentList = findList(currentListTitle, req.user.lists);
        currentList.push(newItem);
        collection.updateOne({_id : new ObjectID(req.user._id)}, {$set : {"lists" : req.user.lists}})

        res.redirect(`/list/${currentListTitle}`)
        
    }


    exports.createListOrFirstList = createListOrFirstList;




//// NONROUTE FUNCTIONS ////\\\\\
    //function that returns the route to either the create first list page or the users first list in the database
    // parameters : req object
    //returns : route 
    function createListOrFirstList (req) {
        if(!req.user.lists || req.user.lists.length === 0){
            return '/createFirstList'
        }
        if(req.user.lists.length > 0){
            return `/list/${req.user.lists[0].title}`
        }
        return `/createFirstList`
    }

    //function that returns a user from a mongo db database based on the id
    // parameters  : id
    // returns : mongo db user document that matches the id
    async function findUserById(id){
        const client = await mongoClient.connect(url);
        const collection = await client.db('todoListV2').collection('users');
        return collection.findOne({_id : new ObjectID(id)})
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