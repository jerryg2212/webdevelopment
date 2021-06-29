const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 8000;
app.use(express.static(path.resolve(__dirname, "./build")));
console.log(__dirname);

app.get('/', (req, res) => {
    console.log("shit me shit me");
    res.send("fuck you");
    //res.sendFile(path.resolve(__dirname, "./build", "index.html"));
})

app.listen(port, () => console.log(`Server is running on port: ${port}`));