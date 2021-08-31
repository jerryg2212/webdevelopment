const express = require('express');
const app = express();
const queryString = require('querystring');
const request = require('request');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const state = process.env.SECRET_CODE;
const redirecturi = 'http://localhost:2000/api/callback';
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

const port = process.env.PORT || 2000;

app.get('/', (req, res) => {
    res.send('penis in my mouth');
})

app.get('/api/authorize', (req, res) => {
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



app.listen(port, () => {console.log(`server listening on port: ${port}`)});