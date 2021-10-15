const express = require('express');
const app = express();
const queryString = require('querystring');
const request = require('request');
require('dotenv').config();
const cors = require('cors');
const { urlencoded } = require('express');
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;

let mongodbUrl = 'mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/spotifyAPI?retryWrites=true&w=majority';
//mongodbUrl = 'mongodb://jerryg2212:Baseball22@cluster0-shard-00-00.cirov.mongodb.net:27017,cluster0-shard-00-01.cirov.mongodb.net:27017,cluster0-shard-00-02.cirov.mongodb.net:27017/spotifyAPI?ssl=true&replicaSet=atlas-13kfwf-shard-0&authSource=admin&retryWrites=true&w=majority'
app.use(cors());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const state = process.env.SECRET_CODE;
const redirecturi = 'http://localhost:3000/api/callback';
const getTokenURL = 'https://accounts.spotify.com/api/token'
const scopes = {
    // to read users top songs and artists
    user_top_read : 'user-top-read',
    user_read_currently_playing : 'user-read-currently-playing',
    user_read_playback_state : 'user-read-playback-state',
    user_modify_playback_state : 'user-modify-playback-state',
    playlist_read_private : 'playlist-read-private',
    playlist_read_collaborative : 'playlist-read-collaborative',
    playlist_modify_public : 'playlist-modify-public',
    playlist_modify_private : 'playlist-modify-private',
    user_read_private : 'user-read-private',
    user_read_email : 'user-read-email'
}

let access_token;
let refresh_token;

const port = process.env.PORT || 2000;



app.get('/', (req, res) => {
    res.send('penis in my mouth');
})
// authorization request to the spotify server that gets a code and redirects to the call back
app.post('/api/authorize', (req, res) => {
    console.log('authorize ran');
    res.redirect('https://accounts.spotify.com/authorize?' + 
    queryString.stringify({
        response_type : 'code',
        client_id : clientId,
        show_dialog : 'true',
        scope : `${encodeURIComponent(stringifyScopes(scopes))}`,
        redirect_uri : redirecturi,
        state : state
    })
    )
})
// callback after the code is received from the spotify server that 
// makes a request to exchange the code for an access and refresh token
app.get('/api/callback', (req, res) => {
    let code = req.query.code;
    console.log(`this is the code ${code}`);
    if(req.query.error){
        res.redirect('/');
    }
    request({
        url: getTokenURL,
        method: 'POST',
        form : {
            grant_type: 'authorization_code',
            code: `${code}`,
            redirect_uri : redirecturi,
            client_id : clientId,
            client_secret : clientSecret
        },
        headers : {
            "Content-type" : "application/x-www-form-urlencoded"
        }
    }, (err, response, body) => {
        if(err){
            res.redirect('/');
        }
        console.log(body);
        body = JSON.parse(body);
        console.log(response.statusCode);
        console.log(`this is the access token ${body.access_token}`);
      //  res.redirect(`/profile?access_token=${body.access_token}&refresh_token=${body.refresh_token}`);
        access_token = body.access_token;
        refresh_token = body.refresh_token;
        res.redirect('/profile');
    })
})

// uses user id sent by query parameters to get users banked songs from mongodb database
app.get('/api/addSongToSongBank', async (req, res) => {
    console.log('add songs to song bank ran');
    let userId = req.query.userId;
   // let songUri = req.query.songUri;
    let songId = req.query.songId;
    try{
        // getting the proper collection to search from
            let client = await MongoClient.connect(mongodbUrl);
            let collection = await client.db('spotifyAPI').collection('songBank');
        // quering to find the user based off the user id
        let user = await collection.findOne({userId : userId});
        // user is null so create user
        if(user == null){
            // create user
            collection.insertOne({
                userId : userId,
                songBank : [songId]
            })
        }else{
            songBank = user.songBank;
            let newSet = new Set(songBank);
            // if the song is already in the song bank do not add it to the song bank
            if(!newSet.has(songId)){
                songBank.push(songId);
                collection.updateOne({userId : userId},{
                    $set : {userId : userId, songBank : songBank}
                })
            }
        }
        res.send(user.songBank);
    }catch(err){
        console.log(err);
        res.status(410).send({message : 'errors accessing the database'});
    }
})

// deletes the songs from the song bank
app.get('/api/deleteSongsFromSongBank', async (req, res) => {
    let userId = req.query.userId;
    let deleteableSongs = req.query.deleteableSongs.split(',');
    try{
        // gets the mongo collection
        let collection = await getMongoCollection();
        // finds the user
        let user = await collection.findOne({userId : userId});
        // accesses the song bank
        let songBank = user.songBank;
        // interate through the deleteableSongs array and remove the proper songs from the song bank
        deleteableSongs.forEach((element, index, array) => {
            songBank.splice(songBank.indexOf(element), 1);
        })
        // updating the database
        collection.updateOne({userId : userId},{
            $set : {userId : userId, songBank : songBank}
        })
        res.send();
    }catch(err){
        console.log(err);
        res.status(410).send({message : 'errorssss accessing the database'});
    }
})

// returns the songs the user has in song bank
app.get('/api/getSongsFromSongBannnk', async (req, res) => {
    console.log('get songs form song bank ran');
    let userId = req.query.userId;
    let songIds = []
    try{
        // getting the proper collection to search from
            let client = await MongoClient.connect(mongodbUrl);
            let collection = await client.db('spotifyAPI').collection('songBank');
        // quering to find the user based off the user id
        let user = await collection.findOne({userId : userId});
        // user is null so create user
        if(user != null){
            songIds = user.songBank;
        }
        res.send(songIds);
    }catch(err){
        console.log(err);
        res.status(410).send({message : 'error accessiklj;ng the database'});
    }
    res.status(405).send({message : 'sdlkjfa;klfds'});
})

app.post('/token', (req, res) => {
    let code = req.body.code;
   // let instance = axios.create({headers: {"Content-type" : "application/x-www-form-urlencoded"}})
   let data = new URLSearchParams();
   data.append('grant_type', 'authorization_code');
   data.append('code', `${code}`);
   data.append('redirect_uri', 'http://localhost:3000/');
   data.append('client_id', `${clientId}`);
   data.append('client_secret', `${clientSecret}`);
   // console.log(`the code is ${code}`);
    axios.post(getTokenURL, data).then(response => {
      //  console.log(`this is the response ${Object.keys(response.data)}`);
        res.json(response.data);
    }).catch(err => res.status(400).send({message : 'failure to get data from server'}));
});
// gets a new access token 
app.post('/refreshToken', (req, res) => {
    console.log('refreshToken path hit');
    let refreshToken = req.body.refreshToken;
    console.log(`this is the refresh token ${refreshToken}`);
    let data = new URLSearchParams();
    data.append('grant_type', 'refresh_token');
    data.append('refresh_token', `${refreshToken}`);
    data.append('client_id', `${clientId}`);
    data.append('client_secret', `${clientSecret}`);
    axios.post(getTokenURL, data).then(response => {
        res.json(response.data);
    }).catch(err => res.status(400).send({message : 'failure to get new access token from the server'}));
})


app.listen(port, () => {console.log(`server listening on port: ${port}`)});

async function getMongoCollection(){
    const client = await MongoClient.connect(mongodbUrl);
    let collection = await client.db('spotifyAPI').collection('songBank');
    return collection;
}

function stringifyScopes(Scopes){
    let result = '';
    for(let scope in Scopes){
        result += ` ${Scopes[scope]}`
    }
    return result;
}