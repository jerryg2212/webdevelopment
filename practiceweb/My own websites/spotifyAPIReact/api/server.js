const express = require('express');
const app = express();
const queryString = require('querystring');
const request = require('request');
require('dotenv').config();
const cors = require('cors');
const { urlencoded } = require('express');
const axios = require('axios');

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

app.post('/token', (req, res) => {
    let code = req.body.code;
   // let instance = axios.create({headers: {"Content-type" : "application/x-www-form-urlencoded"}})
   let data = new URLSearchParams();
   data.append('grant_type', 'authorization_code');
   data.append('code', `${code}`);
   data.append('redirect_uri', 'http://localhost:3000/');
   data.append('client_id', `${clientId}`);
   data.append('client_secret', `${clientSecret}`);
    console.log(`the code is ${code}`);
    axios.post(getTokenURL, data).then(response => {
        console.log(`this is the response ${Object.keys(response.data)}`);
        res.json(response.data);
    }).catch(err => res.json(err));
})



app.listen(port, () => {console.log(`server listening on port: ${port}`)});

function stringifyScopes(Scopes){
    let result = '';
    for(let scope in Scopes){
        result += ` ${Scopes[scope]}`
    }
    return result;
}