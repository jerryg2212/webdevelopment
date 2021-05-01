const http = require('http');

let options = {
    hostname: 'localhost',
    port: 8000,
    path: '/books/:id',
    method: 'GET'
}

const port = process.env.PORT || 8000

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>I am making a server using http module</h1><p> This is a body paragraph</p>')
})

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', d => {
        process.stdout.write('sfsldkjflsjfkls')
    })
})

req.on('error', error => {
    console.error(error)
})

req.end()

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})