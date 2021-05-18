const express = require('express');
const app = express();
const request = require('request');
const queryString = require('querystring');
require('dotenv').config();

const port = process.env.PORT || 5000;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const state = process.env.SECRET_CODE;
const redirecturi = 'http://localhost:8000/callback';
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

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('homepage html should be up');
    res.sendFile('homepage.html', {root : 'public'});
});
app.get('/authorize', (req, res) => {
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
});
app.get('/callback', (req,res) => {
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
        res.redirect(`/profile?access_token=${body.access_token}&refresh_token=${body.refresh_token}`);
    })
});
app.get('/profile', (req, res) => {
    res.sendFile('profile.html', {root : 'public'});
})

app.get('/refreshToken', (req, res) => {
    console.log('got a new refresh token');
    console.log(req.query.refresh_token);
    request({
        url: getTokenURL,
        method : 'POST',
        form : {
            client_id : clientId,
            client_secret: clientSecret,
            grant_type : 'refresh_token',
            refresh_token : req.query.refresh_token
        },
        headers : {
            'Content-type' : 'application/x-www-form-urlencoded'
        }
    }, (err, response, body) => {
        body = JSON.parse(body);
        if(err || body.access_token == undefined){
            console.log('should be redirected to the homepage');
            res.redirect('/');
            res.end();
        }
        else{
            console.log(body);

            console.log(body);
            console.log(`this is the access token ${body.access_token}`);
            console.log( `and this is the refresh token ${body.refresh_token}`);
            res.redirect(`/profile?access_token=${body.access_token}&refresh_token=${body.refresh_token}`);
        }

    })
})

app.listen(port, () => {console.log(`listening on port: ${port}`)});

function stringifyScopes(Scopes){
    let result = '';
    for(let scope in Scopes){
        result += ` ${Scopes[scope]}`
    }
    return result;
}