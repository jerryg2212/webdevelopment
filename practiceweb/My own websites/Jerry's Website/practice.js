const express = require('express');
app = express();


const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('fuck you');
})

app.listen(port, () {console.log(`listening on port ${port}`)});