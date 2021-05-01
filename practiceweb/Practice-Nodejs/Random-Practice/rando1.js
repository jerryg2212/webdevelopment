/*exports.start = function (){const {createServer} = require("http");
let server = createServer((request, response) => {
    response.writeHead(200, {"Dontent-Type": "text/html"});
    response.write(`
    <h1>Hello!</h1>
    <p>You asked for <code>$({request.url}</code></p>)`);
    response.end();
});
server.listen(8000);
console.log("Listening! (port 8000)");
}*/
function writePage(text){
    let div = document.createElement('div');
    div.style.backgroundColor = 'red';
    let para = document.createElement('p');
    para.textContent = text;
    div.appendChild(para);
    document.body.appendChild(div);
}
exports.writePage = writePage();