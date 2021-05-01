//const tesseract = require('node-tesseract-ocr');
const fs = require('fs');
const path = require('path');
const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  }
exports.savePaths = function (dirname){
        //creates text file to write in
       let createStream = fs.createWriteStream('result.txt');
       //photos file
       fs.readdir(dirname, (err, files) => {

           files.forEach((file) => {
                createStream.write('photos/' + path.basename(file) + '\n');
                console.log(path.basename(file));
           });
           createStream.end();
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