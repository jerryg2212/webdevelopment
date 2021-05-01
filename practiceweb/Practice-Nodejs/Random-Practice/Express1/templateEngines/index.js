const express = require('express');
const app = express();
var fs = require('fs') // this engine requires the fs module
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    // this is an extremely simple template engine
    var rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>')
      .replace('#message1#', '<p>' + options.message1 + '</p>')
    return callback(null, rendered);
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!', message1: 'fuck you '})
  });

app.listen(8000, () => {
    console.log('listening on port 8000');
});