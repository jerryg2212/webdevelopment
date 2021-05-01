/*exports.greeting = function(name){
    return `Hello ${name}`;
}*/
/*const {runThis} = require('./rando1');
runThis();*/

const {createServer} = require("http");
const {makePage} = require("./rando1.js");
let text1;
let {readFile} = require("fs");
readFile("first.txt", "utf8", (error, text) => {
    if (error) throw error;
    text1 = text
});
let server = createServer((request, response) => {
    response.writeHead(200, {"Dontent-Type": "text/html"});
    response.write(makePage.writePage(text1));
    response.end();
});
server.listen(8000);
console.log("Listening! (port 8000)");

