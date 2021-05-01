const express = require('express');
const app = express();
const request = require('request');
const queryString = require('querystring')

const clientId = 'be4c5df5871a48f9b7b18205aa42be9b';
const clientSecret = '7778c192590143dcae544c5a3a87f40a';
const redirecturi = 'http://localhost:8000/callback';

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('homepage.html', {root : 'public'});
});
app.get('/authorize', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' + 
    )
})

app.listen(8000, () => {console.log('listening on port 8000')})