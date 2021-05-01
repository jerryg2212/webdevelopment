const express = require('express');
const app = express();
const querystring = require('querystring');
const request = require('request');

//app.use(express.static('public'));
const clientId = 'be4c5df5871a48f9b7b18205aa42be9b';
const clientSecret = '7778c192590143dcae544c5a3a87f40a';
const profileRedirect = 'http://localhost:8000/profile';
let scope = 'user-read-private user-read-email'

app.get('/', (req, res) => {
    res.sendFile('login.html', {root: 'public'});
})

app.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: profileRedirect,
        show_dialog : true
    })
)
})

app.get('/profile', async (req, res) => {
    request({
        url : 'https://accounts.spotify.com/api/token',
        method: 'POST',
        form : {
            grant_type : 'authorization_code',
            code : req.query.code,
            redirect_uri : profileRedirect,
            client_id : clientId,
            client_secret : clientSecret
        }
    }, (err, response, body) => {
        body = JSON.parse(body);
        console.log(`this is the access token ${body.access_token}`);
        request({
            url : 'https://api.spotify.com/v1/me/playlists?limit=50',
            method : 'GET',
            headers : {
                'Authorization' : 'Bearer ' + body.access_token
            }
        },
            (err, response, body) => {
                body = JSON.parse(body);
            result = "<ul>"
            for(playlist of body.items){
                result += `<li>${playlist.name}</li>`;
            }
            console.log(body.items[0]);
            result += "</ul>";
            res.send(result);
        })
    
    })
    console.log(req.query.code);
})



app.listen(8000, () => {console.log('listening on port 8000')});