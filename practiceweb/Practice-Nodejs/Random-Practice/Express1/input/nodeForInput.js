
const express = require('express');
const { Server } = require('http');
const app = express();

//let messages = [];

app.post('/messages', (req, res) => {
    console.log("posted");
    res.send('it has been posted');
    //messages.push('s');
    console.log('ran');
    process.exit();
    console.log('this shourl not go');
    process.on("SIGTERM", () => {
        console.log('sigterm rtan');
        Server.close (() => {
            console.log("Process Terminated");
        });
    });
});

/*app.get('/messages', (req, res) => {
    //console.log(req);
    res.send('This is the messages page');
})*/

app.listen(8000, () => console.log('listening on port 8000'));
