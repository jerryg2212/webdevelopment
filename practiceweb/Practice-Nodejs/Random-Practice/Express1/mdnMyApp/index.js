const { response } = require("express");
const express = require("express");
const app = express();
let port = 8000;

/*app.get("/", (req, res) =>{
    res.send('Hello welcome to this page');
});*/
app.use(express.static('gbr'));

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});