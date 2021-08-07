const mongoClient = require("mongodb").MongoClient;
const {ObjectId} = require("mongodb");
const url = process.env.MONGODB_URI || "mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/todoListV2?retryWrites=true&w=majority";
///// GET METHODS     //////



///// POST METHODS    ///////

    // /list/:listTitle
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
    
        res.redirect(`/list/${currentListTitle}`);
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