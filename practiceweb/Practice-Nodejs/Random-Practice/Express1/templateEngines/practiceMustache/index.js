const mustache = require('mustache');
const express = require('express');
const app = express();

function renderContext(){
    data = {
        title: 'Hello I am Practicing Using Mustache',
        body: 'My name is jerry and i want to learn to use node js'
    }
    template = '<h1>{{title}}</h1><p>{{body}}</p>';
    mustache.render(template,data);
}
app.use(express.static('files'));
console.log('hopefullt');

/*app.get('/', (req, res) => {
    res.send('fuck you');
    console.log('it ran');
    //renderContext();

    console.log('it hopefully workerd');
});*/

app.listen(8000, () => {
    console.log('listening on port 8000');
})


