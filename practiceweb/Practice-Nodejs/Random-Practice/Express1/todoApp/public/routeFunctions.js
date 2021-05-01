const path = require('path');
const fs = require('fs');
const fsP = fs.promises;
const mongoClient = require('mongodb').MongoClient;
const express = require('express');

// url to connect to mongo db
const url = "mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/todoList?retryWrites=true&w=majority"


//displays the first list stored in the data
exports.noListHome = function(req, res){
    fs.readFile('public/information.json', (err, data) => {
        lists = JSON.parse(data);
        //if no lists yet
        if(lists.length == 0){
            res.render('homepage');
        }else{
            let title = lists[0].title;
            title = title.toLowerCase();
            res.redirect(`/list/${title}`);
        }
    })
}
    //mongo db version of the funtion above
        exports.noListHomeMongo = function noListHomeMongo(req,res) {
            mongoClient.connect(url, (err, client) => {
                const db = client.db('todoList');
                db.collections()
                .then((result) => {
                    let numCollections = result.length;
                    let nameOfFirstCollection = result[0].collectionName;
                    let userCollection = result[0];
                    userCollection.findOne({})
                    .then(doc => {
                        let lists = doc.lists;
                        if(lists.length < 1){
                            res.render('homepage');
                        }else{
                            res.redirect('/list/0');
                        }
                    }).then(result => {client.close()})
                    .catch(err => {console.log(`caught error. Here it is ${err}`);client.close()})
                    /*result[0].estimatedDocumentCount()
                    .then((numDocs) => {
                        //if there is only one collection (the default collection) and no documents in that one collection. (no lists yet)
                        if(numDocs === 0){
                        res.render('homepage'); 
                        }else{
                        //console.log(result[0]);
                        const cursor = result[0].find({});
                        cursor.toArray()
                        .then((docs) => {
                            let title = docs[0].lists[0].title;
                            res.redirect(`/list/${0}`);
                        })

                        }
                    });*/
                })
            })
        }

//displays a specific list
exports.displaySpecificList = function (req, res){
    //title of the list the user wants to access
    let matchTitle = req.params.title;
    matchTitle = matchTitle.toLowerCase();
    fs.readFile('public/information.json', (err, data) => {
        let lists = JSON.parse(data);
        for(const elm of lists){
            if(elm.title == matchTitle){
                res.render('choosenList', {title: elm.title, tasks: elm.list, lists: lists})
            }
        }

    })
}
    //mongo db version of the above function
        exports.displaySpecificListMongo = function displaySpecificListMongo(req,res){
            let indexOfList = parseInt(req.params.title);
            mongoClient.connect(url, (err, client) => {
                let db = client.db('todoList');
               const cursor =  db.collection(`client1`).find({});
               cursor.toArray()
               .then(result => {
                   let list = result[0].lists[indexOfList];
                   res.render('choosenListMongo', {title: list.title, tasks: list.tasks, lists: result[0].lists, indexOfList: indexOfList})
               })

            })
        }

//when user deletes items
exports.deleteItems = function (req, res){
    let matchTitle = req.params.title;
    let deleteElements = req.params.items.split(' ');
    if(deleteElements.length > 0){
        fs.readFile('public/information.json', (err, data) => {
            let lists = JSON.parse(data);
            for(const elm of lists){
                if(elm.title == matchTitle){
                    let tasks = elm.list;
                    deleteElements = deleteElements.reverse();
                    deleteElements.forEach((element, ind, arr) => {
                        console.log(element);
                        tasks.splice(element, 1);
                    });
                    fs.writeFile('public/information.json', JSON.stringify(lists), (err) => {
                        if(err){
                            res.send(err);
                        }
                    })
                }
            }

        });
    }
    
    res.redirect(`/list/${matchTitle}`);
}
    //mongo function for the one above deleteItems
        exports.deleteItemsMongo = function(req, res){
            let matchTitleIndex = req.params.title;
            let deleteItems = req.params.items.split(' ').reverse();
            console.log(deleteItems);
            if(deleteItems.length > 0){
                mongoClient.connect(url, (err, client) => {
                    let db = client.db('todoList');
                    let collection = db.collection('client1');
                    collection.findOne({})
                    .then(result => {
                        console.log(result);
                        //update the new tasks array with the none deleted elements
                            let tasks = result.lists[matchTitleIndex].tasks;
                            deleteItems.forEach((elm, index,arr) => {
                                tasks.splice(elm, 1);
                                console.log(result.lists);
                            })
                            //updating the database with the updated information
                            return collection.updateOne({}, {
                                $set : {"lists" : result.lists}
                            })                  
                    })
                    .then(result => {
                        console.log(`result ${result}`);
                        res.redirect(`/list/${matchTitleIndex}`);
                        client.close();
                    })
                    .catch(err => {
                        res.redirect(`/list/${matchTitleIndex}`);   
                        client.close();
                    })
                })
            }
        }

//when the user wants to delete lists
exports.deleteLists = function(req, res){
    //title of the current list
        let matchTitle = req.params.title;
    //get the url parameter of the index's of the lists the user wants to delete
        let deletableLists = req.params.items;
    //turning it into an array
        deletableLists = deletableLists.split(' ');
    //revesring the array because you should delete and array from the end so the index's dont change
        deletableLists = deletableLists.reverse();

    //reading the json file that stores the list
    fs.readFile('public/information.json', (err, data) => {
        let lists = JSON.parse(data);
        deletableLists.forEach((elm, index, arr) => {
            lists.splice(parseInt(elm), 1);
        })
        //saving the updated array of lists to the json file
        fs.writeFile('public/information.json', JSON.stringify(lists), (err) => {if (err) console.log(err)})
    })

    res.redirect('/');
}
    //mongo version to delete list deleteLists
        exports.deleteListsMongo = function (req, res){
            //getting an array of indexes of the lists the user wants to delete
                let deletableLists = req.params.items;
                deletableLists = deletableLists.split(" ").reverse();
            //accessing the database
                mongoClient.connect(url, (err, client) => {
                    const db = client.db('todoList');
                    const collection = db.collection('client1');
                    collection.findOne({})
                    .then(doc => {
                        let lists = doc.lists;
                        deletableLists.forEach((elm, ind, arr) => {
                            lists.splice(elm, 1);
                        })
                        return collection.updateOne({}, {
                            $set: {"lists" : lists}
                        })
                    }).then(result => {
                        res.redirect('/');
                        client.close();
                    })
                    .catch(err => {
                        res.redirect('/');
                        client.close();
                        console.log(`the error has been caught and here it is ${err}`)})
                })
        }

//when user creates their first list
exports.createFirstList = function(req, res){
    let title = req.body.firstList;
    title = title.toLowerCase();
    fs.readFile('public/information.json', (err, data) => {
        if(err){
            console.log(err);
        }else{
            let lists = JSON.parse(data);
            let list = {title: title, list: []};
            lists.push(list);
            fs.writeFile('public/information.json', JSON.stringify(lists), (err) => {
                if(err){
                    //console.log(err);
                }
        })
            res.redirect(`/list/${title}`);
        }

    })
}
    //mongo version of creating the first list createFirstList
        exports.createFirstListMongo = function(req, res){
            let newListTitle = req.body.firstList.toLowerCase();
            //accessing the mongo database
                mongoClient.connect(url, (err, client) => {
                    const db = client.db('todoList');
                    const collection = db.collection('client1');
                    collection.findOne({})
                    .then(doc => {
                        let lists = doc.lists;
                        let newList = {title : newListTitle, tasks : []}
                        lists.push(newList);
                        return collection.updateOne({}, {
                            $set : {"lists" : lists}
                        })
                    }).then(result => {
                        res.redirect(`/list/0`);
                        client.close();
                    })
                    .catch(err => {
                        console.log(`caught the error here it is ${err}`);
                        res.redirect('/');
                        client.close();
                    })
                })
        }

//when user inputs new item
exports.addNewItem = function (req, res){
    //title to match
    let matchTitle = req.params.title;
    fs.readFile('public/information.json', (err, data) => {
        let lists = JSON.parse(data);
        for(const elm of lists){
            if(elm.title == matchTitle.toLowerCase()){
                elm.list.push(req.body.newtask);
                fs.writeFile('public/information.json', JSON.stringify(lists), (err) => {
                    res.redirect(`/list/${elm.title}`);
                    });
            }
        }

    })
}
    //mongo version of the function above. addNewItem
        exports.addNewItemMongo = function (req, res){
            //index of the lists array in the database that we need to load
                let matchTitleIndex = parseInt(req.params.title);
            //accessing the mongoClient
                mongoClient.connect(url, (err, client) => {
                    //the database
                        const db = client.db('todoList');
                    //the client
                        const collection = db.collection('client1');
                    //the new task being added
                        let newTask = req.body.newtask;
                    //accessing the document in the collection
                    collection.findOne({})
                    .then(result => {
                        //adding the new item to the proper list
                            result.lists[matchTitleIndex].tasks.push(newTask);
                        //the new list
                            let newLists = result.lists;
                        //updating the new tasks 
                            collection.updateOne({},{
                                $set : {"lists" : newLists}
                            })
                    })
                        res.redirect(`/list/${matchTitleIndex}`)
                    
                })
        }

//when user creates a new list
exports.createNewList = function (req, res) {
    let listTitle = req.body.listTitle;
    listTitle = listTitle.toLowerCase();
    fs.readFile('public/information.json', (err, data) => {
        data = JSON.parse(data);
        data.push({title: listTitle, list: []});
        fs.writeFile('public/information.json', JSON.stringify(data), (err) => {
            res.redirect(`/list/${listTitle}`);
        })
    })
}
    //mongo function for when the user creates a newlist createNewList
        exports.createNewListMongo = function (req, res) {
            //saving the name of the new list
                let newListTitle = req.body.listTitle.toLowerCase();
            //index of the new element added to the lists
                let indexOfNewList = 0;
            //accessing the mongo database
                mongoClient.connect(url, (err, client) => {
                    const db = client.db('todoList');
                    const collection = db.collection('client1');
                    collection.findOne({})
                    .then(doc => {
                        let lists = doc.lists;
                        let newList = {title: newListTitle, tasks: []}
                        lists.push(newList);
                        indexOfNewList = lists.length - 1;
                        return collection.updateOne({},{
                            $set : {"lists" : lists}
                        })
                    }).then(result => {
                        res.redirect(`/list/${indexOfNewList}`);
                        client.close();
                    }).catch(err => {
                        console.log(`this is the errormsg ${err}`);
                        res.redirect('/');
                        client.close();
                    });
                })
        }


