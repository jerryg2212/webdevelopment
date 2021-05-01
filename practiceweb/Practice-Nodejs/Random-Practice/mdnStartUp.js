const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

let server = http.createServer((req, res) => {
    res.statusCode = (200);
    res.setHeader("Content-type", 'text/plain');
    res.end("This hopefully worked");
});

server.listen(port, hostname, () => {
    console.log(`The server is running on http://${hostname}:${port}/`);
});
