const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

router.use((req, res , next) => {
    console.log('the downloads middleware ran');
    //req.fuck = 'shit';
    next();
});

router.get('/title/:user', (req, res) => {
    res.send(req.params);
})

router.get('/dir', (req, res) => {
   // res.download('New.zip');
   console.log(req.fuck);
   res.send(req.fuck);
})

router.param('user', (req, res, next, value, name) => {
    console.log(`value: ${value}  name: ${name}`);
    next();
})

exports.downloadsRouter = router;
exports.person = 'jerry';