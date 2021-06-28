const express = require('express');
const app = express();
const path = require('path');

const port =  process.env.PORT || 3000;

app.use(express.static(__dirname, "../my-app/src"));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../my-app/src", "index.html"));
})

app.listen(port, () => {console.log(`listening on port: ${port}`)})