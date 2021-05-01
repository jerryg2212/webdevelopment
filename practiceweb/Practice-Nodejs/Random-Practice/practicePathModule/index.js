const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 8000
app.use(express.static(__dirname));
console.log(__dirname + 'penis');
app.get('/home', (req, res) => {
    console.log(path.dirname(path.resolve('index.html')) + '  resolve ran');
    fs.writeFile('index.docx', 'hello hopefullt this worked', (err) => { console.log(err)});
    res.sendFile('index.html', {root: __dirname});

})

app.listen(port, () => {console.log(`listening on port ${port}`)});