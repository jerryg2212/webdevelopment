const express = require('express');
const app = express();
const fs = require('fs');
const fsPromises = require('fs').promises;

app.get('/', (req, res) => {
   /* fsPromises.open('1.txt', 'r+')
    .then((result) => {
        result.appendFile('fuck you dsklfjsdklf')
        result.write('shit on me');

    //console.log(file);
        result.close();
    })
    .catch((err) => {
        console.log(err);
    })
    res.send('fuck you');*/
    showFile('1.txt');
    res.send('this');

});

app.listen(3000, () => {
    console.log('listening on port 3000');
})

async function showFile(filePath){
    let file = await fsPromises.open(filePath, 'r+');
    let text = await file.readFile({encoding : 'utf8'});
    console.log(text);
}