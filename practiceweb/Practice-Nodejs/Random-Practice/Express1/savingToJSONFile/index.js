const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res)=> {
    let info;
    fs.readFile('./information.json', function(err, data) {
        info = JSON.parse(data);
        res.send(info);
    })
   // console.log(info);
    //res.send('fuck you');
});

app.get('/save/newName/:id', (req, res) => {
    fs.readFile('./information.json', function(err, data){
        let info = JSON.parse(data);
        if(!info.newNames){
            info.newNames = [];
        }
        info.newNames.push(req.params.id);
        fs.writeFile('./information.json', JSON.stringify(info), function(err){
            res.redirect('/');
            res.send(`The new name ${req.params.id} was saved`);
        });
    })
});

app.listen(8000, () => {
    console.log('listening on port 8000');
})