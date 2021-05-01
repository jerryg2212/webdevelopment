const express = require('express');
const app = express();
const downloadsRouter = require('./downloads');

class Person{
    static constructor(name){
        this.name = 'jerry';
    }
    makeSauce(){
        console.log('shithead');
    }
}

app.use('/downloads', downloadsRouter.downloadsRouter);

app.get('/', (req, res, next) => {
    let jerry = new Person();
    console.log(JSON.stringify(jerry));
    res.send(jerry.prototype);
})

app.listen(8000, () => {console.log('litensing on port 8000')})


