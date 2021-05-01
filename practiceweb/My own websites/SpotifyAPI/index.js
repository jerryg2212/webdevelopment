const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('homepage.html', {root : 'public'});
})

app.listen(8000, () => {console.log('listening on port 8000')})