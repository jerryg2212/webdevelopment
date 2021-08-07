const express = require('express');
const app = express();
const path = require('path');
const mongoClient = require("mongodb").MongoClient;
const {ObjectId} = require("mongodb");
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('express-flash');
const bcrypt = require('bcrypt');



const url = process.env.MONGODB_URI || "mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/todoListV2?retryWrites=true&w=majority";

exports.loadAuthentication = (passport) => {
    
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
}
