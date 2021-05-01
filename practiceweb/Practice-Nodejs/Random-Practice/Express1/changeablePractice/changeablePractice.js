const express = require('express');
const app = express();
const path = require('path');

app.use(express.json({type: 'text/html'}));
//app.use(express.urlencoded({extended: false}))
app.engine('pug', require('pug').__express);

app.use(express.static('public'))
console.log(__dirname + 'firnamlkfj;sdaklfja;');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'public/views'));


app.get('/', (req, res) => {
    res.render('post');
})
app.post('/body', (req, res) => {
    res.type('json');
    console.log(`this is the body ${req.body.body}`);
    res.redirect('/');
})

app.listen(8000, () => {console.log('listening on port 8000')});