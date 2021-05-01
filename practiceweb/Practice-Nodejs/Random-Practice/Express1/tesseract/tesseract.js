//const tesseract = require('node-tesseract-ocr');
const fs = require('fs');
const path = require('path');
const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  }
  savePaths('./');
function savePaths(dirname){
    //reads the directory that holds the photos folder
    fs.readdir(dirname, (err, files) => {
        //creates text file to write in
       let createStream = fs.createWriteStream('result.txt');
       //photos file
       fs.readdir('./photos', (err, files) => {
           files.forEach((file) => {
                console.log(path.basename(file));
           })
       })

    })
}
/*fs.readdir('./photos', (err, files) => {
    files.forEach((file) => {
        tesseract.recognize(file, config)
        .then((text) => {
            console.log(text);
        }).catch(err => {
            console.log(err.message);
        })
    })
})*/