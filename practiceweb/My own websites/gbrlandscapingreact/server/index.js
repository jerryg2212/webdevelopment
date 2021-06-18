const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 8000;
app.use(express.static(path.resolve(__dirname, "../frontendreact/src")));
console.log(__dirname);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontendreact/src", "index.html"));
})

app.listen(port, () => console.log(`Server is running on port: ${port}`));